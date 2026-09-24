package com.exemplo.diarioequestre.ui.viewmodel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.exemplo.diarioequestre.data.FirestoreRepository
import com.exemplo.diarioequestre.data.RotaEquestre
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
class RotaViewModel : ViewModel() {
    private val repository = FirestoreRepository()
    private val _rotas = MutableStateFlow<List<RotaEquestre>>(emptyList())
    val rotas: StateFlow<List<RotaEquestre>> = _rotas.asStateFlow()
    private val _rotaEmEdicao = MutableStateFlow<RotaEquestre?>(null)
    val rotaEmEdicao: StateFlow<RotaEquestre?> = _rotaEmEdicao.asStateFlow()
    private val _exibirDialogo = MutableStateFlow(false)
    val exibirDialogo: StateFlow<Boolean> = _exibirDialogo.asStateFlow()
    init {
        carregarRotas()
    }
    private fun carregarRotas() {
        viewModelScope.launch {
            repository.obterRotas().collect { lista ->
                _rotas.value = lista
            }
        }
    }
    fun abrirDialogoParaCriar() {
        _rotaEmEdicao.value = null
        _exibirDialogo.value = true
    }
    fun abrirDialogoParaEditar(rota: RotaEquestre) {
        _rotaEmEdicao.value = rota
        _exibirDialogo.value = true
    }
    fun fecharDialogo() {
        _exibirDialogo.value = false
        _rotaEmEdicao.value = null
    }
    fun salvarRota(nome: String, fazenda: String, km: Double, terreno: String) {
        viewModelScope.launch {
            val atual = _rotaEmEdicao.value
            if (atual == null) {
                repository.adicionarRota(
                    RotaEquestre(
                        nomeRota = nome,
                        fazendaVisitada = fazenda,
                        quilometragem = km,
                        condicaoTerreno = terreno
                    )
                )
            } else {
                repository.atualizarRota(
                    atual.copy(
                        nomeRota = nome,
                        fazendaVisitada = fazenda,
                        quilometragem = km,
                        condicaoTerreno = terreno
                    )
                )
            }
            fecharDialogo()
        }
    }
    fun deletarRota(id: String) {
        viewModelScope.launch {
            repository.deletarRota(id)
        }
    }
}