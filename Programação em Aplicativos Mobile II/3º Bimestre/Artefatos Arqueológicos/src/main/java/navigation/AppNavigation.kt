package com.example.artefatos.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.artefatos.pages.HomePage
import com.example.artefatos.pages.LoginPage
import com.example.artefatos.pages.SignupPage
import com.example.artefatos.viewmodel.AuthViewModel

@Composable
fun AppNavigation(modifier: Modifier = Modifier, authViewModel: AuthViewModel) {
    val navController = rememberNavController()
    val authState by authViewModel.authState.collectAsState()
    
    NavHost(
        navController = navController,
        startDestination = if (authState is com.example.artefatos.viewmodel.AuthState.Authenticated) {
            "home"
        } else {
            "login"
        },
        modifier = modifier
    ) {
        composable("login") {
            LoginPage(
                modifier = Modifier,
                navController = navController,
                authViewModel = authViewModel
            )
        }
        composable("signup") {
            SignupPage(
                modifier = Modifier,
                navController = navController,
                authViewModel = authViewModel
            )
        }
        composable("home") {
            HomePage(
                modifier = Modifier,
                navController = navController,
                authViewModel = authViewModel
            )
        }
    }
}