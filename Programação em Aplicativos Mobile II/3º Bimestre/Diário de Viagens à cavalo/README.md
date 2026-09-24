# 🏇 Diário de Viagens a Cavalo

Aplicativo Android desenvolvido em **Jetpack Compose** integrado ao **Firebase Firestore** para gerenciamento e registro de expedições, cavalgadas, rotas equestres e fazendas visitadas.

---

## 🎨 Identidade Visual

O design do aplicativo utiliza uma paleta de cores inspirada no ambiente equestre e rústico:
- **Marrom Couro (`#6D4C41`)**: Usado na TopAppBar e títulos principais.
- **Verde Campo (`#2E7D32`)**: Destaque nos botões de ação (Create/Update).
- **Bege Rústico (`#F5F2EB`)**: Fundo geral da aplicação para conforto visual em uso ao ar livre.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem**: Kotlin
- **UI Framework**: Jetpack Compose (Material 3)
- **Arquitetura**: MVVM (Model-View-ViewModel)
- **Banco de Dados**: Firebase Firestore (NoSQL em tempo real)
- **Gerenciamento de Estado**: `StateFlow` e `remember`

---

## 📋 Funcionalidades CRUD

1. **Create (Criar)**: Permite cadastrar o nome da rota ou fazenda, quilometragem percorrida, condição do terreno (ex: arenoso, pedregoso, lama) e observações adicionais.
2. **Read (Ler)**: Exibe a lista atualizada em tempo real de todas as expedições salvas no Cloud Firestore.
3. **Update (Atualizar)**: Permite selecionar uma rota existente, carregar os dados nos campos de formulário e salvar as edições.
4. **Delete (Excluir)**: Remove o registro correspondente diretamente da coleção no banco de dados Firestore.

---

## 🚀 Passo a Passo de Implementação

### 1. Configuração do Firebase
1. Acesse o [Firebase Console](https://console.firebase.google.com/).
2. Crie um novo projeto chamado `DiarioViagensCavalo`.
3. Adicione um aplicativo Android registrando o pacote (`com.example.diarioviagensequestres`).
4. Baixe o arquivo `google-services.json` e insira na pasta `app/` do projeto.
5. Ative o **Cloud Firestore** no modo de teste (*Test Mode*).

### 2. Configuração das Dependências (`build.gradle.kts`)
Adicione as seguintes dependências ao arquivo `app/build.gradle.kts`:

```kotlin
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    id("com.google.gms.google-services")
}

dependencies {
    
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.material3)
    implementation(libs.androidx.lifecycle.viewmodel.compose)

    implementation(platform("com.google.firebase:firebase-bom:33.1.0"))
    implementation("com.google.firebase:firebase-firestore-ktx")
}
