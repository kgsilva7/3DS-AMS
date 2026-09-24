package com.exemplo.diarioequestre.ui.screens
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.exemplo.diarioequestre.ui.theme.PalhaBeige
import com.exemplo.diarioequestre.ui.viewmodel.RotaViewModel
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(viewModel: RotaViewModel) {
    val rotas by viewModel.rotas.collectAsState()
    val exibirDialogo by viewModel.exibirDialogo.collectAsState()
    val rotaEmEdicao by viewModel.rotaEmEdicao.collectAsState()
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("🤠 Diário de Viagens a Cavalo") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = PalhaBeige
                )
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = { viewModel.abrirDialogoParaCriar() },
                containerColor = MaterialTheme.colorScheme.secondary,
                contentColor = PalhaBeige
            ) {
                Icon(Icons.Default.Add, contentDescription = "Nova Rota")
            }
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp)
        ) {
            if (rotas.isEmpty()) {
                Text(
                    text = "Nenhuma rota registrada.\nClique no botão + para adicionar!",
                    modifier = Modifier.align(Alignment.Center)
                )
            } else {
                LazyColumn(modifier = Modifier.fillMaxSize()) {
                    items(rotas, key = { it.id }) { rota ->
                        RotaCard(
                            rota = rota,
                            onEditar = { viewModel.abrirDialogoParaEditar(rota) },
                            onDeletar = { viewModel.deletarRota(rota.id) }
                        )
                    }
                }
            }
            if (exibirDialogo) {
                RotaFormDialog(
                    rotaEmEdicao = rotaEmEdicao,
                    onDismiss = { viewModel.fecharDialogo() },
                    onSalvar = { nome, fazenda, km, terreno ->
                        viewModel.salvarRota(nome, fazenda, km, terreno)
                    }
                )
            }
        }
    }
}