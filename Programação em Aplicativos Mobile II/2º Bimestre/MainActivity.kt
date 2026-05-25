package com.example.myapplication
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Build
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
data class MaintenanceItem(
    val id: Int,
    val equipamento: String,
    val problema: String,
    val status: String
)
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    HardwareMaintenanceScreen()
                }
            }
        }
    }
}
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HardwareMaintenanceScreen() {
    var equipamento by remember { mutableStateOf("") }
    var problema by remember { mutableStateOf("") }
    var maintenanceList by remember {
        mutableStateOf(
            listOf(
                MaintenanceItem(
                    1,
                    "Notebook Dell",
                    "Superaquecimento",
                    "Em análise"
                ),
                MaintenanceItem(
                    2,
                    "PC Gamer",
                    "Fonte queimada",
                    "Concluído"
                )
            )
        )
    }
    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text("Manutenção de Hardware")
                }
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = {
                    if (equipamento.isNotEmpty() && problema.isNotEmpty()) {
                        val novoItem = MaintenanceItem(
                            id = maintenanceList.size + 1,
                            equipamento = equipamento,
                            problema = problema,
                            status = "Pendente"
                        )
                        maintenanceList = maintenanceList + novoItem
                        equipamento = ""
                        problema = ""
                    }
                }
            ) {
                Icon(Icons.Default.Add, contentDescription = "Adicionar")
            }
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .padding(16.dp)
                .fillMaxSize()
        ) {
            OutlinedTextField(
                value = equipamento,
                onValueChange = { equipamento = it },
                label = { Text("Equipamento") },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedTextField(
                value = problema,
                onValueChange = { problema = it },
                label = { Text("Problema") },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(20.dp))
            Text(
                text = "Chamados de manutenção",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(12.dp))
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(maintenanceList) { item ->
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        elevation = CardDefaults.cardElevation(4.dp)
                    ) {
                        Row(
                            modifier = Modifier
                                .padding(16.dp)
                                .fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Default.Build,
                                contentDescription = "Ferramenta"
                            )
                            Spacer(modifier = Modifier.width(16.dp))
                            Column {
                                Text(
                                    text = item.equipamento,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(text = "Problema: ${item.problema}")
                                Text(text = "Status: ${item.status}")
                            }
                        }
                    }
                }
            }
        }
    }
}