Botão Logcat

Um guia prático voltado à arquitetura Android que utiliza Jetpack Compose e Material 3 para realizar o acompanhamento de diagnósticos em tempo real.

Descrição do projeto
O Botão Logcat é um aplicativo com finalidade educacional, desenvolvido na ETEC Zona Leste. Sua proposta é evidenciar, de forma didática, a separação e integração das camadas de um aplicativo moderno, destacando a relação entre uma interface declarativa e o registro de eventos de diagnóstico por meio do Logcat.

Principais funcionalidades
A interface é composta por quatro botões interativos do tipo ElevatedButton, cada um associado a um estado específico do sistema, representado por cores distintas.
Cada botão dispara um nível diferente de log no console (Debug, Info, Warning e Error), permitindo o acompanhamento em tempo real do comportamento da aplicação.
O projeto também inclui tratamento de exceções, utilizando blocos try-catch para capturar falhas críticas, como RuntimeException, evitando que o aplicativo seja encerrado inesperadamente.
Além disso, emprega o recurso @Preview, possibilitando a visualização e teste de componentes diretamente no Android Studio, sem necessidade de execução completa do app.

Tecnologias empregadas
A aplicação foi desenvolvida em Kotlin, utilizando o Jetpack Compose como framework de interface declarativa. O design segue as diretrizes do Material 3, garantindo consistência visual por meio de cores e tipografia padronizadas. O gerenciamento de dependências é feito com Gradle (Kotlin DSL), e o monitoramento de eventos utiliza o Logcat, via API de logs do Android.

Arquitetura e organização
O projeto está estruturado em camadas bem definidas para facilitar manutenção e escalabilidade. A configuração inclui ajustes de SDK (mínimo 24 e alvo 33) e ativação do Compose no Gradle.
O sistema de design contempla a criação de uma paleta de cores personalizada (Color.kt) e definições tipográficas (Type.kt).
Na camada de interface, são utilizados componentes reutilizáveis, como a função ActionButton, responsável por encapsular a aparência e comportamento dos botões.
Por fim, a camada de lógica de registro implementa chamadas como Log.d, Log.i, Log.w e Log.e, permitindo a comunicação direta com o desenvolvedor durante a execução do aplicativo.
 <img width="621" height="671" alt="image" src="https://github.com/user-attachments/assets/6d2fdf8b-3240-4ebe-b383-209bb9637c42" />
