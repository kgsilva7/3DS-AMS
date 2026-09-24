package com.exemplo.diarioequestre
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import com.exemplo.diarioequestre.ui.screens.MainScreen
import com.exemplo.diarioequestre.ui.theme.DiarioEquestreTheme
import com.exemplo.diarioequestre.ui.viewmodel.RotaViewModel
class MainActivity : ComponentActivity() {
    private val viewModel: RotaViewModel by viewModels()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            DiarioEquestreTheme {
                MainScreen(viewModel = viewModel)
            }
        }
    }
}