package com.exemplo.diarioequestre.ui.theme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
private val LightColorScheme = lightColorScheme(
    primary = TerreiroSaddle,
    secondary = VerdeCampo,
    background = FundoMarromClaro,
    surface = PalhaBeige,
    onPrimary = PalhaBeige,
    onBackground = CouroEscuro,
    onSurface = CouroEscuro
)
@Composable
fun DiarioEquestreTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        content = content
    )
}