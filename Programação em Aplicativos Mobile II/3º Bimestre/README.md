# 🏺 Artefatos Arqueológicos

Aplicativo Android desenvolvido em **Jetpack Compose** com autenticação **Firebase**, exibindo uma coleção de artefatos arqueológicos.

## 📋 Sobre o Projeto

Este aplicativo foi desenvolvido para a disciplina de Programação Mobile, demonstrando:

- ✅ Interface 100% em Jetpack Compose
- ✅ Autenticação Firebase (Login/Cadastro)
- ✅ Listagem de artefatos arqueológicos
- ✅ Detalhes dos artefatos
- ✅ Design temático de arqueologia

## 🗺️ Temas Abordados

- Ferramentas de pedra (machados, raspadores, foices)
- Cerâmicas (ânforas, vasos canopos, urnas indígenas)
- Objetos do cotidiano (moinhos, colares)
- Armas (pontas de lança, espadas)

## 🚀 Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **Kotlin** | Linguagem de programação |
| **Jetpack Compose** | UI declarativa |
| **Firebase Authentication** | Autenticação de usuários |
| **Coil** | Carregamento de imagens |
| **Material 3** | Design System |

## 📱 Funcionalidades

### 🔐 Autenticação
- Login com Email/Senha
- Cadastro de novos usuários
- Logout
- Validação de formulários

### 🏺 Coleção
- Grid de artefatos
- Filtro por categoria
- Detalhes em diálogo
- Informações: nome, descrição, período, localização, material

## 🎨 Design

O aplicativo utiliza uma paleta de cores terrosas inspirada em tons de cerâmica e escavações arqueológicas:

- **Primary**: Marrom Terracota (#8D6E63)
- **Background**: Bege Claro (#F5F0EB)
- **Surface**: Off-White (#FBF8F5)

## 📦 Estrutura do Projeto
app/
├── src/main/java/com/example/artefatos/
│ ├── MainActivity.kt # Ponto de entrada
│ ├── navigation/
│ │ └── AppNavigation.kt # Navegação entre telas
│ ├── viewmodel/
│ │ └── AuthViewModel.kt # Lógica de autenticação
│ ├── pages/
│ │ ├── LoginPage.kt # Tela de login
│ │ ├── SignupPage.kt # Tela de cadastro
│ │ └── HomePage.kt # Tela principal
│ ├── model/
│ │ └── Artefato.kt # Modelo de dados
│ ├── data/
│ │ └── ArtefatoData.kt # Dados dos artefatos
│ └── ui/theme/
│ ├── Color.kt
│ ├── Theme.kt
│ └── Type.kt
└── res/

text

## 🔧 Como Executar

### Pré-requisitos

- Android Studio Hedgehog ou superior
- JDK 17
- Dispositivo/Emulador Android API 24+

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/artefatos-arqueologicos.git
Abra no Android Studio

Configure o Firebase:

Crie um projeto no Firebase Console

Adicione o app Android (package: com.example.artefatos)

Baixe o google-services.json e coloque em app/

Habilite Authentication (Email/Senha)

Execute o app:

bash
./gradlew installDebug
📸 Capturas de Tela
Login	Cadastro	Home	Detalhes
(inserir imagem)	(inserir imagem)	(inserir imagem)	(inserir imagem)
🎥 Vídeo de Demonstração
[Link para o vídeo no YouTube/Drive]

📚 Dependências
kotlin
// Versões principais
androidx.compose = "2023.10.01"
firebase-bom = "32.6.0"
navigation-compose = "2.7.5"
coil-compose = "2.5.0"
👨‍💻 Autor
Gustavo Alexandre da Silva

GitHub: @kgsilva7

📄 Licença
Este projeto é desenvolvido para fins educacionais.

Tags: Android Kotlin Jetpack Compose Firebase Arqueologia Artefatos

text

---

## 18. COMANDOS PARA GERAR O APK

```bash
# Limpar projeto
./gradlew clean

# Build de debug
./gradlew assembleDebug

# Build de release
./gradlew assembleRelease

# APK estará em:
# app/build/outputs/apk/debug/app-debug.apk
# app/build/outputs/apk/release/app-release.apk
