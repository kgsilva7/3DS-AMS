package com.exemplo.diarioequestre.data
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await
class FirestoreRepository {
    private val firestore = FirebaseFirestore.getInstance()
    private val colecaoRotas = firestore.collection("rotas_equestres")
    suspend fun adicionarRota(rota: RotaEquestre): Boolean {
        return try {
            val docRef = colecaoRotas.document()
            val novaRota = rota.copy(id = docRef.id)
            docRef.set(novaRota).await()
            true
        } catch (e: Exception) {
            false
        }
    }
    fun obterRotas(): Flow<List<RotaEquestre>> = callbackFlow {
        val listener = colecaoRotas.addSnapshotListener { snapshot, error ->
            if (error != null) {
                close(error)
                return@addSnapshotListener
            }
            val lista = snapshot?.documents?.mapNotNull { doc ->
                doc.toObject(RotaEquestre::class.java)
            } ?: emptyList()
            trySend(lista)
        }
        awaitClose { listener.remove() }
    }
    suspend fun atualizarRota(rota: RotaEquestre): Boolean {
        return try {
            colecaoRotas.document(rota.id).set(rota).await()
            true
        } catch (e: Exception) {
            false
        }
    }
    suspend fun deletarRota(id: String): Boolean {
        return try {
            colecaoRotas.document(id).delete().await()
            true
        } catch (e: Exception) {
            false
        }
    }
}