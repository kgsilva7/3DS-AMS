Botão Logcat
Um guia prático de arquitetura Android utilizando Jetpack Compose e Material 3 para monitoramento de diagnóstico em tempo real.

Sobre o Projeto
O Botão Logcat é um aplicativo educacional desenvolvido na ETEC Zona Leste. O objetivo principal é demonstrar a desconstrução das camadas de um app moderno, focando na integração entre uma interface declarativa e a lógica de registro de eventos (diagnóstico) através do console Logcat.

Funcionalidades principais
Interface Semântica: Quatro botões interativos (ElevatedButton) com cores que representam diferentes estados do sistema.

Monitoramento em Tempo Real: Cada botão aciona uma severidade de diagnóstico diferente (Debug, Info, Warning e Error) no console.

Tratamento de Exceções: Demonstração de resiliência através de um bloco try-catch que captura falhas críticas (como RuntimeException) sem derrubar o app.

Desenvolvimento Ágil: Uso de @Preview para visualização e isolamento de componentes em tempo real no Android Studio.

Tecnologias utilizadas
Linguagem: Kotlin

UI Framework: Jetpack Compose (Interface Declarativa)

Design System: Material 3 (Cores semânticas e Tipografia padronizada)

Gerenciador de Dependências: Gradle (Kotlin DSL)

Ferramentas de Diagnóstico: Logcat (Log API do Android)

Arquitetura e Camadas
O projeto é estruturado em módulos claros para garantir escalabilidade:

Configuração: Ajustes de SDK (minSdk 24 / targetSdk 33) e habilitação do Compose no Gradle.

Sistema de Design: Definição de paleta de cores customizada em Color.kt e tipografia em Type.kt.

Interface (UI): Componentes reutilizáveis como a função ActionButton, que encapsula a lógica visual dos botões.

Lógica de Registro: Implementação dos métodos Log.d, Log.i, Log.w e Log.e para comunicação com o desenvolvedor.
