#  Projeto 2: Lembrete de Tarefas Geolocalizadas (Geo-To-Do)

Aplicativo desenvolvido em **React Native (Expo)** para a disciplina de **PAM II (Programação de Aplicativos Mobile II)**. O sistema cadastra tarefas atreladas a locais específicos no mapa e dispara alertas e notificações push por proximidade geográfica (*geofence*), integrando sensores físicos e widgets de tela inicial.

---

##  Funcionalidades e Uso dos Conceitos

1. **Localização e Mapas (`react-native-maps`)**:
   - Seleção interativa de pontos geográficos no mapa.
   - Desenho de um círculo (`Circle`) em volta de cada tarefa para representar visualmente o raio de abrangência (*geofence*).
   - Coordenadas reais mapeadas em pontos estratégicos de São Paulo (Av. Paulista, MASP, Estação Paulista, Parque Ibirapuera e Centro Histórico).

2. **Notificações por Proximidade (`expo-location` + `expo-notifications`)**:
   - Monitoramento contínuo da posição GPS do dispositivo.
   - Disparo automático de notificação local assim que o usuário entra no raio delimitado da tarefa.
   - *Simplificação para Aula*: Implementação de verificação periódica via *polling* em primeiro plano (`setInterval` + fórmula matemática de Haversine para cálculo de distância em metros) garantindo robustez e compatibilidade com emuladores.

3. **Widgets de Tela Inicial (`react-native-android-widget`)**:
   - Card/Widget nativo na tela inicial do Android listando em tempo real as **3 tarefas pendentes mais próximas** da posição GPS atual do dispositivo.

4. **Sensores Físicos (`expo-sensors` - `LightSensor`)**:
   - Leitura da iluminância do ambiente em Lux ($\text{lx}$).
   - Alternância automática e dinâmica entre o **Tema Claro** e o **Tema Escuro** conforme a luminosidade do ambiente captada pelo sensor de luz do celular.

---

##  Tecnologias Utilizadas

* **React Native** (`v0.74.5`) / **React** (`v18.2.0`)
* **Expo** (`~51.0.0`)
* **`react-native-maps`** (Exibição de mapas, marcadores e círculos de geofence)
* **`expo-location`** (Captura de coordenadas GPS)
* **`expo-notifications`** (Agendamento e disparo de notificações locais)
* **`expo-sensors`** (`LightSensor` para o sensor de luz ambiente)
* **`react-native-android-widget`** (Widget dinâmico para a tela inicial)

---

## Estrutura de Arquivos do Projeto

```text
geo-to-do-pam2/
├── App.js                # Componente principal (Mapa, Geofence, LightSensor e Lógica)
├── TaskWidget.js         # Implementação do Widget Android (Top 3 tarefas mais próximas)
├── package.json          # Dependências e scripts do Expo
└── README.md             # Documentação do projeto
```
---

Gustavo Alexandre da Silva, Igor Sales Moreira, Higor Mota de Oliveira e Felipe Gabriel Tesser
Desenvolvido para fins acadêmicos na disciplina de PAM II.
