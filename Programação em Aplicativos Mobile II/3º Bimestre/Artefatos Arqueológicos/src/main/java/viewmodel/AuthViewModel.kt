package com.example.artefatos.viewmodel

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.UserProfileChangeRequest

sealed class AuthState {
    object Authenticated : AuthState()
    object Unauthenticated : AuthState()
    object Loading : AuthState()
    data class Error(val message: String) : AuthState()
}

class AuthViewModel : ViewModel() {
    private val auth: FirebaseAuth = FirebaseAuth.getInstance()
    
    private val _authState = MutableLiveData<AuthState>()
    val authState: LiveData<AuthState> = _authState
    
    private val _currentUser = MutableLiveData<FirebaseUser?>()
    val currentUser: LiveData<FirebaseUser?> = _currentUser
    
    init {
        checkAuthStatus()
    }
    
    fun checkAuthStatus() {
        val user = auth.currentUser
        _currentUser.value = user
        _authState.value = if (user != null) {
            AuthState.Authenticated
        } else {
            AuthState.Unauthenticated
        }
    }
    
    fun login(email: String, password: String, onResult: (Boolean, String) -> Unit) {
        _authState.value = AuthState.Loading
        auth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    _currentUser.value = auth.currentUser
                    _authState.value = AuthState.Authenticated
                    onResult(true, "Login realizado com sucesso!")
                } else {
                    val error = task.exception?.message ?: "Erro ao fazer login"
                    _authState.value = AuthState.Error(error)
                    onResult(false, error)
                }
            }
    }
    
    fun signup(name: String, email: String, password: String, onResult: (Boolean, String) -> Unit) {
        _authState.value = AuthState.Loading
        auth.createUserWithEmailAndPassword(email, password)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    val user = auth.currentUser
                    user?.let {
                        val profileUpdates = UserProfileChangeRequest.Builder()
                            .setDisplayName(name)
                            .build()
                        it.updateProfile(profileUpdates)
                    }
                    _currentUser.value = auth.currentUser
                    _authState.value = AuthState.Authenticated
                    onResult(true, "Cadastro realizado com sucesso!")
                } else {
                    val error = task.exception?.message ?: "Erro ao cadastrar"
                    _authState.value = AuthState.Error(error)
                    onResult(false, error)
                }
            }
    }
    
    fun logout() {
        auth.signOut()
        _currentUser.value = null
        _authState.value = AuthState.Unauthenticated
    }
    
    fun getCurrentUser(): FirebaseUser? {
        return auth.currentUser
    }
}