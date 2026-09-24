package com.exemplo.diarioequestre.ui.screens
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.exemplo.diarioequestre.data.RotaEquestre
@Composable
fun RotaFormDialog(
    rotaEmEdicao: RotaEquestre?,
    onDismiss: () -> Unit,
    onSalvar: (nome: String, fazenda: String, km: Double, terreno: String) -> Unit
) {
    var nomeRota by remember { mutableStateOf(rotaEmEdicao?.nomeRota ?: "") }
    var fazendaVisitada by remember { mutableStateOf(rotaEmEdicao?.fazendaVisitada ?: "") }
    var quilometragem by remember { mutableStateOf(rotaEmEdicao?.quilometragem?.toString() ?: "") }
    var condicaoTerreno by remember { mutableStateOf(rotaEmEdicao?.condicaoTerreno ?: "") }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(if (rotaEmEdicao == null) "Nova Rota Equestre" else "Editar Rota")
        },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(
                    value = nomeRota,
                    onValueChange = { nomeRota = it },
                    label = { Text("Nome da Rota") },
                    singleLine = true
                )
                OutlinedTextField(
                    value = fazendaVisitada,
                    onValueChange = { fazendaVisitada = it },
                    label = { Text("Fazenda Visitada") },
                    singleLine = true
                )
                OutlinedTextField(
                    value = quilometragem,
                    onValueChange = { quilometragem = it },
                    label = { Text("Quilometragem (km)") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    singleLine = true
                )
                OutlinedTextField(
                    value = condicaoTerreno,
                    onValueChange = { condicaoTerreno = it },
                    label = { Text("Condição do Terreno (ex: Lama, Pedregoso)") },
                    singleLine = true
                )
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val kmValue = quilometragem.toDoubleOrNull() ?: 0.0
                    if (nomeRota.isNotBlank()) {
                        onSalvar(nomeRota, fazendaVisitada, kmValue, condicaoTerreno)
                    }
                }
            ) {
                Text("Salvar")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancelar")
            }
        }
    )
}