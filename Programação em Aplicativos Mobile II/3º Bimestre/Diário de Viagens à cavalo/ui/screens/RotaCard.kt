package com.exemplo.diarioequestre.ui.screens
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.exemplo.diarioequestre.data.RotaEquestre
import com.exemplo.diarioequestre.ui.theme.CouroEscuro
import com.exemplo.diarioequestre.ui.theme.VermelhoAlerta
@Composable
fun RotaCard(
    rota: RotaEquestre,
    onEditar: () -> Unit,
    onDeletar: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "🐎 ${rota.nomeRota}",
                    style = MaterialTheme.typography.titleMedium,
                    color = CouroEscuro
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(text = "🏡 Fazenda: ${rota.fazendaVisitada}")
                Text(text = "📏 Distância: ${rota.quilometragem} km")
                Text(text = "🏔️ Terreno: ${rota.condicaoTerreno}")
            }
            Row {
                IconButton(onClick = onEditar) {
                    Icon(
                        imageVector = Icons.Default.Edit,
                        contentDescription = "Editar",
                        tint = MaterialTheme.colorScheme.primary
                    )
                }
                IconButton(onClick = onDeletar) {
                    Icon(
                        imageVector = Icons.Default.Delete,
                        contentDescription = "Deletar",
                        tint = VermelhoAlerta
                    )
                }
            }
        }
    }
}