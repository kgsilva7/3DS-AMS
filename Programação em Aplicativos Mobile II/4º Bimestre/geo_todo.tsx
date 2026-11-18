import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  MapPin,
  Bell,
  Sun,
  Moon,
  Navigation,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Radio,
  Smartphone,
  Code2,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Crosshair,
  Compass,
  Sliders,
  AlertTriangle,
  Sparkles,
  Layers,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

// Fórmula de Haversine para cálculo exato de distância em metros entre duas coordenadas
function calculateHaversineMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Raio médio da Terra em metros
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatDistance(meters) {
  if (!Number.isFinite(meters)) return '0 m';
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(2)} km`;
}

// Coordenadas reais e verificadas em São Paulo (Av. Paulista, Ibirapuera e Centro)
const INITIAL_USER_LOCATION = {
  lat: -23.5552,
  lng: -46.6555,
  label: 'Avenida Paulista (Próximo ao nº 1800), São Paulo - SP'
};

const INITIAL_TASKS = [
  {
    id: 'task-masp',
    title: 'Devolver livros na biblioteca do MASP',
    locationName: 'MASP — Av. Paulista, 1578',
    category: 'Estudos',
    lat: -23.5567,
    lng: -46.6535,
    radius: 300,
    completed: false,
    sourceUrl: 'https://latitude.to/articles-by-country/br/brazil/15032/sao-paulo-museum-of-art',
    createdAt: '14:20'
  },
  {
    id: 'task-paulista-metro',
    title: 'Reunião do grupo de PAM II na Estação Paulista',
    locationName: 'Estação Paulista (Metrô Linha 4 - Amarela)',
    category: 'Acadêmico',
    lat: -23.553164,
    lng: -46.657164,
    radius: 250,
    completed: false,
    sourceUrl: 'https://latitude.to/articles-by-country/br/brazil/235158/paulista-sao-paulo-metro',
    createdAt: '15:00'
  },
  {
    id: 'task-paulista-2300',
    title: 'Comprar cabos USB-C e adaptadores para laboratório',
    locationName: 'Avenida Paulista, 2300 — Consolação',
    category: 'Compras',
    lat: -23.556866,
    lng: -46.661231,
    radius: 350,
    completed: false,
    sourceUrl: 'https://www.findlatitudeandlongitude.com/l/Avenida+paulista%2C+2300%2C+sp/2870995/',
    createdAt: '15:40'
  },
  {
    id: 'task-ibirapuera',
    title: 'Treino funcional ao ar livre no Parque Ibirapuera',
    locationName: 'Parque Ibirapuera — Av. Pedro Álvares Cabral',
    category: 'Saúde',
    lat: -23.587416,
    lng: -46.657634,
    radius: 500,
    completed: false,
    sourceUrl: 'https://www.gps-latitude-longitude.com/gps-coordinates-of-parque-ibirapuera',
    createdAt: '16:15'
  },
  {
    id: 'task-centro',
    title: 'Protocolar certificado técnico na Secretaria',
    locationName: 'Centro Histórico / Praça da Sé, São Paulo',
    category: 'Documentação',
    lat: -23.5500,
    lng: -46.6333,
    radius: 400,
    completed: false,
    sourceUrl: 'https://en.wikipedia.org/wiki/S%C3%A3o_Paulo',
    createdAt: '17:00'
  }
];

// Rota pré-definida pela Av. Paulista para simulação de deslocamento (polling em 1º plano)
const SIMULATION_WAYPOINTS = [
  { lat: -23.5552, lng: -46.6555, label: 'Av. Paulista, 1800' },
  { lat: -23.5561, lng: -46.6542, label: 'Aproximando do MASP' },
  { lat: -23.5567, lng: -46.6535, label: 'Em frente ao MASP (Dentro do Geofence)' },
  { lat: -23.5548, lng: -46.6559, label: 'Caminhando sentido Consolação' },
  { lat: -23.553164, lng: -46.657164, label: 'Estação Paulista do Metrô (Dentro do Geofence)' },
  { lat: -23.5555, lng: -46.6595, label: 'Av. Paulista, 2100' },
  { lat: -23.556866, lng: -46.661231, label: 'Av. Paulista, 2300 (Dentro do Geofence)' }
];

// Código-fonte completo em React Native (Expo) para entrega acadêmica PAM II
const REACT_NATIVE_FILES = {
  'App.js': `import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { LightSensor } from 'expo-sensors';

// Configuração do handler de notificações locais (expo-notifications)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Fórmula de Haversine para calcular distância em metros
function getDistanceInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (v) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function App() {
  // 1. Estado do Sensor de Luz (LightSensor) e Tema Automático
  const [illuminance, setIlluminance] = useState(250);
  const [autoTheme, setAutoTheme] = useState(true);
  const [manualDark, setManualDark] = useState(false);
  const isDark = autoTheme ? illuminance < 100 : manualDark;

  // 2. Estado de Localização GPS (expo-location)
  const [userLocation, setUserLocation] = useState({
    latitude: -23.5552,
    longitude: -46.6555,
  });

  // 3. Estado do Formulário e Ponto selecionado no Mapa
  const [selectedCoord, setSelectedCoord] = useState({
    latitude: -23.5567,
    longitude: -46.6535,
  });
  const [taskTitle, setTaskTitle] = useState('');
  const [radius, setRadius] = useState(300);

  // 4. Lista de Tarefas Geolocalizadas (Geo-To-Do)
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Devolver livros na biblioteca do MASP',
      latitude: -23.5567,
      longitude: -46.6535,
      radius: 300,
      completed: false,
    },
    {
      id: '2',
      title: 'Reunião de grupo na Estação Paulista',
      latitude: -23.553164,
      longitude: -46.657164,
      radius: 250,
      completed: false,
    },
    {
      id: '3',
      title: 'Comprar cabos técnicos na Av. Paulista, 2300',
      latitude: -23.556866,
      longitude: -46.661231,
      radius: 350,
      completed: false,
    },
  ]);

  // Controle de tarefas já notificadas no perímetro atual
  const notifiedIdsRef = useRef(new Set());

  // Assinatura do Sensor de Luz (LightSensor)
  useEffect(() => {
    LightSensor.setUpdateInterval(1000);
    const subscription = LightSensor.addListener(({ illuminance: lux }) => {
      setIlluminance(Math.round(lux));
    });
    return () => subscription && subscription.remove();
  }, []);

  // Permissões de Notificação e Localização + Polling em 1º Plano
  useEffect(() => {
    let pollingTimer = null;

    async function setupLocationAndPolling() {
      await Notifications.requestPermissionsAsync();
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      // Simplificação para Aula: checagem periódica via polling em primeiro plano
      pollingTimer = setInterval(async () => {
        try {
          const pos = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          setUserLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        } catch (err) {
          // Mantém última coordenada conhecida em caso de falha de leitura
        }
      }, 3000);
    }

    setupLocationAndPolling();
    return () => {
      if (pollingTimer) clearInterval(pollingTimer);
    };
  }, []);

  // Verificação de entrada no Geofence e disparo de Notificação Local
  useEffect(() => {
    tasks.forEach((task) => {
      if (task.completed) return;
      const dist = getDistanceInMeters(
        userLocation.latitude,
        userLocation.longitude,
        task.latitude,
        task.longitude
      );

      if (dist <= task.radius) {
        if (!notifiedIdsRef.current.has(task.id)) {
          notifiedIdsRef.current.add(task.id);
          Notifications.scheduleNotificationAsync({
            content: {
              title: '📍 Alerta de Proximidade (Geo-To-Do)',
              body: \`Você entrou no raio de \${task.radius}m da tarefa: "\${task.title}" (\${Math.round(dist)}m)\`,
              sound: true,
            },
            trigger: null, // Disparo imediato
          });
        }
      } else {
        notifiedIdsRef.current.delete(task.id);
      }
    });
  }, [userLocation, tasks]);

  // Cálculo das 3 tarefas pendentes mais próximas para o Card/Widget
  const closestThreeTasks = useMemo(() => {
    return tasks
      .filter((t) => !t.completed)
      .map((t) => ({
        ...t,
        distance: Math.round(
          getDistanceInMeters(
            userLocation.latitude,
            userLocation.longitude,
            t.latitude,
            t.longitude
          )
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
  }, [tasks, userLocation]);

  function handleAddTask() {
    if (!taskTitle.trim()) return;
    const newTask = {
      id: String(Date.now()),
      title: taskTitle.trim(),
      latitude: selectedCoord.latitude,
      longitude: selectedCoord.longitude,
      radius: Number(radius) || 300,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setTaskTitle('');
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  const themeStyles = isDark ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Cabeçalho com Status do LightSensor */}
      <View style={[styles.header, themeStyles.card]}>
        <View>
          <Text style={[styles.title, themeStyles.text]}>Geo-To-Do • PAM II</Text>
          <Text style={[styles.subtitle, themeStyles.subtext]}>
            Sensor de Luz: {illuminance} lx ({isDark ? 'Tema Escuro' : 'Tema Claro'})
          </Text>
        </View>
        <TouchableOpacity
          style={styles.sensorBtn}
          onPress={() => {
            if (autoTheme) {
              setAutoTheme(false);
              setManualDark(!isDark);
            } else {
              setAutoTheme(true);
            }
          }}
        >
          <Text style={styles.sensorBtnText}>
            {autoTheme ? 'Auto (Lux)' : 'Manual'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Widget Card: 3 Tarefas Pendentes Mais Próximas */}
      <View style={[styles.widgetCard, themeStyles.card]}>
        <Text style={[styles.widgetHeader, themeStyles.text]}>
          📌 WIDGET: 3 TAREFAS MAIS PRÓXIMAS DO GPS
        </Text>
        {closestThreeTasks.map((item, idx) => (
          <View key={item.id} style={styles.widgetRow}>
            <Text style={[styles.widgetRank, themeStyles.text]}>#{idx + 1}</Text>
            <Text style={[styles.widgetTaskTitle, themeStyles.text]} numberOfLines={1}>
              {item.title}
            </Text>
            <Text
              style={[
                styles.widgetDistance,
                item.distance <= item.radius ? styles.insideBadge : styles.outsideBadge,
              ]}
            >
              {item.distance} m
            </Text>
          </View>
        ))}
      </View>

      {/* Mapa com Seleção de Local e Círculo (Geofence) */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.5552,
          longitude: -46.6555,
          latitudeDelta: 0.018,
          longitudeDelta: 0.018,
        }}
        userInterfaceStyle={isDark ? 'dark' : 'light'}
        onPress={(e) => setSelectedCoord(e.nativeEvent.coordinate)}
      >
        {/* Marcador da Posição Atual do Usuário */}
        <Marker
          coordinate={userLocation}
          title="Sua Posição GPS"
          pinColor="#10b981"
        />

        {/* Ponto selecionado para Nova Tarefa + Círculo de Preview */}
        <Marker
          coordinate={selectedCoord}
          title="Local da Nova Tarefa"
          pinColor="#6366f1"
        />
        <Circle
          center={selectedCoord}
          radius={radius}
          fillColor="rgba(99, 102, 241, 0.18)"
          strokeColor="rgba(99, 102, 241, 0.8)"
          strokeWidth={2}
        />

        {/* Tarefas Cadastradas e seus Círculos de Geofence */}
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <Marker
              coordinate={{ latitude: task.latitude, longitude: task.longitude }}
              title={task.title}
              description={\`Raio: \${task.radius}m\`}
              pinColor={task.completed ? '#94a3b8' : '#f59e0b'}
            />
            <Circle
              center={{ latitude: task.latitude, longitude: task.longitude }}
              radius={task.radius}
              fillColor={
                task.completed
                  ? 'rgba(148, 163, 184, 0.12)'
                  : 'rgba(245, 158, 11, 0.22)'
              }
              strokeColor={task.completed ? '#94a3b8' : '#f59e0b'}
              strokeWidth={2}
            />
          </React.Fragment>
        ))}
      </MapView>

      {/* Formulário de Cadastro de Tarefa Geolocalizada */}
      <View style={[styles.form, themeStyles.card]}>
        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Nova tarefa neste ponto do mapa..."
          placeholderTextColor="#94a3b8"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <View style={styles.radiusRow}>
          {[150, 300, 500, 800].map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.radiusChip, radius === r && styles.radiusChipActive]}
              onPress={() => setRadius(r)}
            >
              <Text style={styles.radiusChipText}>{r}m</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addBtn} onPress={handleAddTask}>
            <Text style={styles.addBtnText}>+ Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de Tarefas */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.taskItem, themeStyles.card]}
            onPress={() => toggleTask(item.id)}
          >
            <Text style={[styles.taskText, themeStyles.text]}>
              {item.completed ? '✅ ' : '⭕ '} {item.title} (Raio: {item.radius}m)
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { fontSize: 12 },
  sensorBtn: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  sensorBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  widgetCard: { margin: 8, padding: 10, borderRadius: 12, elevation: 2 },
  widgetHeader: { fontSize: 11, fontWeight: '700', marginBottom: 6 },
  widgetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  widgetRank: { fontWeight: '700', width: 28 },
  widgetTaskTitle: { flex: 1, fontSize: 13 },
  widgetDistance: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  insideBadge: { backgroundColor: '#10b981', color: '#fff' },
  outsideBadge: { backgroundColor: '#e2e8f0', color: '#1e293b' },
  map: { height: 250, width: '100%' },
  form: { padding: 10 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },
  radiusRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  radiusChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#64748b',
  },
  radiusChipActive: { backgroundColor: '#4f46e5' },
  radiusChipText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  addBtn: {
    marginLeft: 'auto',
    backgroundColor: '#10b981',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addBtnText: { color: '#fff', fontWeight: '700' },
  list: { flex: 1, paddingHorizontal: 8 },
  taskItem: { padding: 10, borderRadius: 8, marginVertical: 4 },
  taskText: { fontSize: 13 },
});

const lightTheme = StyleSheet.create({
  container: { backgroundColor: '#f8fafc' },
  card: { backgroundColor: '#ffffff' },
  text: { color: '#0f172a' },
  subtext: { color: '#475569' },
  input: { borderColor: '#cbd5e1', color: '#0f172a' },
});

const darkTheme = StyleSheet.create({
  container: { backgroundColor: '#0f172a' },
  card: { backgroundColor: '#1e293b' },
  text: { color: '#f8fafc' },
  subtext: { color: '#94a3b8' },
  input: { borderColor: '#334155', color: '#f8fafc' },
});`,

  'TaskWidget.js': `import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

// Widget nativo Android exibindo as 3 tarefas pendentes mais próximas da posição GPS atual
export function TaskWidget({ closestTasks = [] }) {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 14,
        flexDirection: 'column',
      }}
    >
      <TextWidget
        text="📍 GEO-TO-DO • 3 MAIS PRÓXIMAS"
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          color: '#38bdf8',
          marginBottom: 8,
        }}
      />

      {closestTasks.length === 0 ? (
        <TextWidget
          text="Nenhuma tarefa pendente próxima."
          style={{ fontSize: 13, color: '#94a3b8' }}
        />
      ) : (
        closestTasks.slice(0, 3).map((task, index) => (
          <FlexWidget
            key={task.id}
            style={{
              width: 'match_parent',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 4,
            }}
          >
            <TextWidget
              text={\`\${index + 1}. \${task.title}\`}
              style={{ fontSize: 13, color: '#f8fafc' }}
            />
            <TextWidget
              text={\`\${task.distance} m\`}
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: task.distance <= task.radius ? '#10b981' : '#f59e0b',
              }}
            />
          </FlexWidget>
        ))
      )}
    </FlexWidget>
  );
}`,

  'package.json': `{
  "name": "geo-to-do-pam2",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios"
  },
  "dependencies": {
    "expo": "~51.0.0",
    "expo-location": "~17.0.1",
    "expo-notifications": "~0.28.1",
    "expo-sensors": "~13.0.9",
    "react": "18.2.0",
    "react-native": "0.74.5",
    "react-native-maps": "1.14.0",
    "react-native-android-widget": "^0.11.0"
  }
}`
};

export default function App() {
  // Aba principal: 'app' (Aplicação Interativa + Mapa + Widget + Sensores) | 'code' (Código React Native)
  const [activeTab, setActiveTab] = useState('app');

  // Sensor de Luz (LightSensor) em Lux e Tema Claro/Escuro
  const [lux, setLux] = useState(240);
  const [luxThreshold, setLuxThreshold] = useState(100);
  const [autoTheme, setAutoTheme] = useState(true);
  const [manualDark, setManualDark] = useState(false);

  const isDark = autoTheme ? lux < luxThreshold : manualDark;

  // Posição GPS atual do dispositivo
  const [userLocation, setUserLocation] = useState(INITIAL_USER_LOCATION);

  // Modo de clique no mapa: 'newTask' (Definir local da tarefa) | 'moveGps' (Mover posição GPS do usuário)
  const [mapClickMode, setMapClickMode] = useState('newTask');

  // Coordenada selecionada no mapa para cadastrar nova tarefa
  const [draftCoord, setDraftCoord] = useState({
    lat: -23.5542,
    lng: -46.6548
  });

  // Campos do formulário de nova tarefa
  const [newTitle, setNewTitle] = useState('');
  const [newLocationName, setNewLocationName] = useState('');
  const [newCategory, setNewCategory] = useState('Estudos');
  const [newRadius, setNewRadius] = useState(300);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'pending' | 'inside' | 'completed'

  // Lista de tarefas
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('pam2_geo_todo_tasks_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // Fallback seguro
    }
    return INITIAL_TASKS;
  });

  // Simulação de Polling em 1º Plano
  const [isPollingActive, setIsPollingActive] = useState(true);
  const [isWalkingSim, setIsWalkingSim] = useState(false);
  const [pollingIntervalSec, setPollingIntervalSec] = useState(2);
  const [pollingCount, setPollingCount] = useState(0);
  const [lastPollTime, setLastPollTime] = useState('22:14:56');
  const waypointIndexRef = useRef(0);

  // Notificações Locais e Som de Alerta
  const [notifications, setNotifications] = useState([]);
  const [activeBanner, setActiveBanner] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const notifiedTaskIdsRef = useRef(new Set());

  // Estado da aba de código React Native
  const [selectedCodeFile, setSelectedCodeFile] = useState('App.js');
  const [copiedFile, setCopiedFile] = useState(false);

  // Referências para o mapa Leaflet
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const layersGroupRef = useRef(null);
  const [leafletReady, setLeafletReady] = useState(false);

  // Salvar tarefas no localStorage com try/catch
  useEffect(() => {
    try {
      localStorage.setItem('pam2_geo_todo_tasks_v1', JSON.stringify(tasks));
    } catch (e) {
      // Ignora bloqueio de storage no iframe
    }
  }, [tasks]);

  // Síntese de alerta sonoro via Web Audio API quando notificação dispara
  const playNotificationSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.setValueAtTime(880, now + 0.12); // A5
      gain1.gain.setValueAtTime(0.14, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.45);
    } catch (e) {
      // Ignora caso o navegador bloqueie áudio antes de interação
    }
  }, [soundEnabled]);

  // Tarefas enriquecidas com distância em tempo real (fórmula de Haversine) e status de geofence
  const tasksWithDistance = useMemo(() => {
    return tasks.map((task) => {
      const distance = calculateHaversineMeters(
        userLocation.lat,
        userLocation.lng,
        task.lat,
        task.lng
      );
      const isInside = !task.completed && distance <= task.radius;
      return {
        ...task,
        distance: Math.round(distance),
        isInside
      };
    });
  }, [tasks, userLocation]);

  // Card / Widget da Tela Inicial: As 3 tarefas pendentes mais próximas da posição GPS atual
  const closestThreePending = useMemo(() => {
    return tasksWithDistance
      .filter((t) => !t.completed)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
  }, [tasksWithDistance]);

  // Função de verificação de proximidade (Geofencing / Polling)
  const checkGeofenceProximity = useCallback(
    (currentLat, currentLng, currentTasks) => {
      const timeStr = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setLastPollTime(timeStr);
      setPollingCount((c) => c + 1);

      currentTasks.forEach((task) => {
        if (task.completed) {
          notifiedTaskIdsRef.current.delete(task.id);
          return;
        }
        const dist = Math.round(
          calculateHaversineMeters(currentLat, currentLng, task.lat, task.lng)
        );

        if (dist <= task.radius) {
          if (!notifiedTaskIdsRef.current.has(task.id)) {
            notifiedTaskIdsRef.current.add(task.id);
            const newAlert = {
              id: `notif-${Date.now()}-${task.id}`,
              taskId: task.id,
              title: task.title,
              locationName: task.locationName,
              distance: dist,
              radius: task.radius,
              timestamp: timeStr
            };
            setNotifications((prev) => [newAlert, ...prev.slice(0, 19)]);
            setActiveBanner(newAlert);
            playNotificationSound();
          }
        } else {
          // Saiu do perímetro: permite re-notificar se entrar novamente
          notifiedTaskIdsRef.current.delete(task.id);
        }
      });
    },
    [playNotificationSound]
  );

  // Dispara checagem imediata quando usuário se move ou tarefas mudam
  useEffect(() => {
    if (isPollingActive) {
      checkGeofenceProximity(userLocation.lat, userLocation.lng, tasks);
    }
  }, [userLocation, tasks, isPollingActive, checkGeofenceProximity]);

  // Loop de Polling em 1º Plano (setInterval conforme "Simplificação para Aula")
  useEffect(() => {
    if (!isPollingActive) return undefined;

    const intervalId = setInterval(() => {
      if (isWalkingSim) {
        waypointIndexRef.current =
          (waypointIndexRef.current + 1) % SIMULATION_WAYPOINTS.length;
        const nextWp = SIMULATION_WAYPOINTS[waypointIndexRef.current];
        setUserLocation({
          lat: nextWp.lat,
          lng: nextWp.lng,
          label: nextWp.label
        });
      } else {
        checkGeofenceProximity(userLocation.lat, userLocation.lng, tasks);
      }
    }, pollingIntervalSec * 1000);

    return () => clearInterval(intervalId);
  }, [
    isPollingActive,
    isWalkingSim,
    pollingIntervalSec,
    userLocation.lat,
    userLocation.lng,
    tasks,
    checkGeofenceProximity
  ]);

  // Carregar Leaflet via CDN oficial (unpkg) e inicializar mapa com tiles ArcGIS MapServer
  useEffect(() => {
    let isMounted = true;

    function ensureLeafletLoaded() {
      if (window.L) {
        if (isMounted) setLeafletReady(true);
        return;
      }

      if (!document.getElementById('leaflet-css-cdn')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css-cdn';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      const existingScript = document.getElementById('leaflet-js-cdn');
      if (existingScript) {
        existingScript.addEventListener('load', () => {
          if (isMounted) setLeafletReady(true);
        });
        return;
      }

      const script = document.createElement('script');
      script.id = 'leaflet-js-cdn';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        if (isMounted) setLeafletReady(true);
      };
      document.body.appendChild(script);
    }

    ensureLeafletLoaded();
    return () => {
      isMounted = false;
    };
  }, []);

  // Inicializar instância do mapa quando Leaflet estiver pronto e a aba 'app' estiver visível
  useEffect(() => {
    if (!leafletReady || activeTab !== 'app' || !mapContainerRef.current) return;
    const L = window.L;
    if (!L) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [userLocation.lat, userLocation.lng],
        zoom: 15,
        zoomControl: true
      });

      const tileUrl = isDark
        ? 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
        : 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';

      tileLayerRef.current = L.tileLayer(tileUrl, {
        attribution: 'Tiles &copy; Esri &mdash; ArcGIS MapServer',
        maxZoom: 19
      }).addTo(map);

      layersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current && activeTab !== 'app') {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafletReady, activeTab]);

  // Atualizar handler de clique no mapa conforme o modo ('newTask' ou 'moveGps')
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const handleMapClick = (e) => {
      const { lat, lng } = e.latlng;
      const roundedLat = Number(lat.toFixed(6));
      const roundedLng = Number(lng.toFixed(6));

      if (mapClickMode === 'moveGps') {
        setIsWalkingSim(false);
        setUserLocation({
          lat: roundedLat,
          lng: roundedLng,
          label: `Posição Manual (${roundedLat.toFixed(4)}, ${roundedLng.toFixed(4)})`
        });
      } else {
        setDraftCoord({ lat: roundedLat, lng: roundedLng });
        if (!newLocationName) {
          setNewLocationName(`Ponto no Mapa (${roundedLat.toFixed(4)}, ${roundedLng.toFixed(4)})`);
        }
      }
    };

    map.off('click');
    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
    };
  }, [leafletReady, activeTab, mapClickMode, newLocationName]);

  // Trocar basemap (Tema Claro vs Tema Escuro via LightSensor)
  useEffect(() => {
    const L = window.L;
    const map = mapInstanceRef.current;
    if (!L || !map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const tileUrl = isDark
      ? 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
      : 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';

    tileLayerRef.current = L.tileLayer(tileUrl, {
      attribution: 'Tiles &copy; Esri &mdash; ArcGIS MapServer',
      maxZoom: 19
    }).addTo(map);
  }, [isDark, leafletReady, activeTab]);

  // Renderizar marcadores e círculos de Geofence no Leaflet
  useEffect(() => {
    const L = window.L;
    const map = mapInstanceRef.current;
    const group = layersGroupRef.current;
    if (!L || !map || !group) return;

    group.clearLayers();

    // 1. Círculo e Marcador de Preview da Nova Tarefa (em criação)
    L.circle([draftCoord.lat, draftCoord.lng], {
      radius: Number(newRadius) || 300,
      color: '#6366f1',
      weight: 2,
      dashArray: '6, 6',
      fillColor: '#6366f1',
      fillOpacity: 0.14
    }).addTo(group);

    const draftIcon = L.divIcon({
      className: 'custom-draft-pin',
      html: `<div style="background:#6366f1;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.35);font-weight:700;font-size:14px;">+</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    L.marker([draftCoord.lat, draftCoord.lng], { icon: draftIcon })
      .bindPopup(
        `<b>Novo Ponto de Tarefa</b><br/>Raio planejado: ${newRadius} m<br/><small>${draftCoord.lat.toFixed(5)}, ${draftCoord.lng.toFixed(5)}</small>`
      )
      .addTo(group);

    // 2. Tarefas Cadastradas + Círculos (Geofences)
    tasksWithDistance.forEach((task) => {
      const strokeColor = task.completed
        ? '#94a3b8'
        : task.isInside
        ? '#10b981'
        : '#f59e0b';

      const fillColor = task.completed
        ? '#94a3b8'
        : task.isInside
        ? '#10b981'
        : '#f59e0b';

      L.circle([task.lat, task.lng], {
        radius: task.radius,
        color: strokeColor,
        weight: task.isInside ? 3 : 2,
        fillColor,
        fillOpacity: task.completed ? 0.08 : task.isInside ? 0.25 : 0.16
      }).addTo(group);

      const badgeColor = task.completed
        ? '#64748b'
        : task.isInside
        ? '#059669'
        : '#d97706';

      const taskIcon = L.divIcon({
        className: 'custom-task-pin',
        html: `<div style="background:${badgeColor};color:#fff;padding:3px 7px;border-radius:9999px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-size:11px;font-weight:700;white-space:nowrap;">${
          task.completed ? '✓' : task.isInside ? '🔔' : '📍'
        } ${task.radius}m</div>`,
        iconSize: [68, 24],
        iconAnchor: [34, 12]
      });

      L.marker([task.lat, task.lng], { icon: taskIcon })
        .bindPopup(
          `<b>${task.title}</b><br/>${task.locationName}<br/>Distância atual: <b>${task.distance} m</b> (Raio: ${task.radius} m)`
        )
        .addTo(group);
    });

    // 3. Marcador da Posição GPS Atual do Dispositivo
    const gpsIcon = L.divIcon({
      className: 'custom-gps-pin',
      html: `<div style="position:relative;width:34px;height:34px;display:flex;align-items:center;justify-content:center;">
        <div style="position:absolute;width:34px;height:34px;border-radius:50%;background:rgba(14,165,233,0.35);animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
        <div style="position:relative;width:18px;height:18px;border-radius:50%;background:#0284c7;border:3px solid #ffffff;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>
      </div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    L.marker([userLocation.lat, userLocation.lng], { icon: gpsIcon })
      .bindPopup(
        `<b>📱 Sua Posição GPS Atual</b><br/>${userLocation.label}<br/><small>${userLocation.lat.toFixed(5)}, ${userLocation.lng.toFixed(5)}</small>`
      )
      .addTo(group);
  }, [tasksWithDistance, userLocation, draftCoord, newRadius, leafletReady, activeTab]);

  // Funções de controle do GPS (Joystick / Teleporte / Navegador)
  const moveUserByDelta = (dLat, dLng, dirLabel) => {
    setIsWalkingSim(false);
    setUserLocation((prev) => {
      const nextLat = Number((prev.lat + dLat).toFixed(6));
      const nextLng = Number((prev.lng + dLng).toFixed(6));
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo([nextLat, nextLng], { animate: true });
      }
      return {
        lat: nextLat,
        lng: nextLng,
        label: `Deslocamento ${dirLabel} (${nextLat.toFixed(4)}, ${nextLng.toFixed(4)})`
      };
    });
  };

  const teleportToTask = (task) => {
    setIsWalkingSim(false);
    const nextLoc = {
      lat: task.lat,
      lng: task.lng,
      label: `No perímetro: ${task.locationName}`
    };
    setUserLocation(nextLoc);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([task.lat, task.lng], 16, { animate: true });
    }
  };

  const focusTaskOnMap = (task) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([task.lat, task.lng], 16, { animate: true });
    }
  };

  const handleUseRealGeolocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nextLat = Number(pos.coords.latitude.toFixed(6));
        const nextLng = Number(pos.coords.longitude.toFixed(6));
        setIsWalkingSim(false);
        setUserLocation({
          lat: nextLat,
          lng: nextLng,
          label: 'GPS Real do Navegador'
        });
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([nextLat, nextLng], 15, { animate: true });
        }
      },
      () => {
        // Fallback silencioso para posição atual na Av. Paulista
      }
    );
  };

  // Cadastro de nova tarefa geolocalizada
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      locationName:
        newLocationName.trim() ||
        `Ponto Selecionado (${draftCoord.lat.toFixed(4)}, ${draftCoord.lng.toFixed(4)})`,
      category: newCategory,
      lat: draftCoord.lat,
      lng: draftCoord.lng,
      radius: Number(newRadius) || 300,
      completed: false,
      sourceUrl: '',
      createdAt: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setTasks((prev) => [created, ...prev]);
    setNewTitle('');
    setNewLocationName('');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo([created.lat, created.lng], { animate: true });
    }
  };

  const toggleTaskCompleted = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    notifiedTaskIdsRef.current.delete(taskId);
  };

  // Filtragem da lista de tarefas
  const filteredTasks = useMemo(() => {
    return tasksWithDistance.filter((t) => {
      if (filterStatus === 'pending') return !t.completed;
      if (filterStatus === 'inside') return t.isInside;
      if (filterStatus === 'completed') return t.completed;
      return true;
    });
  }, [tasksWithDistance, filterStatus]);

  // Copiar código React Native
  const handleCopyCode = () => {
    const codeText = REACT_NATIVE_FILES[selectedCodeFile] || '';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeText);
      } else {
        const ta = document.createElement('textarea');
        ta.value = codeText;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = codeText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const insideCount = tasksWithDistance.filter((t) => t.isInside).length;
  const pendingCount = tasksWithDistance.filter((t) => !t.completed).length;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Banner Flutuante de Notificação Local (expo-notifications) */}
      {activeBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-lg animate-bounce">
          <div
            className={`flex items-start gap-3 p-4 rounded-2xl shadow-2xl border ${
              isDark
                ? 'bg-emerald-950/95 border-emerald-500/60 text-emerald-50'
                : 'bg-emerald-900 text-white border-emerald-400'
            }`}
          >
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 shrink-0">
              <Bell className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  expo-notifications • Alerta de Geofence
                </span>
                <span className="text-xs text-emerald-200">{activeBanner.timestamp}</span>
              </div>
              <p className="font-bold text-sm mt-0.5 truncate">{activeBanner.title}</p>
              <p className="text-xs text-emerald-100 mt-0.5">
                Você entrou no perímetro de {activeBanner.radius}m ({activeBanner.locationName}) — Distância atual:{' '}
                <strong>{activeBanner.distance} m</strong>
              </p>
            </div>
            <button
              onClick={() => setActiveBanner(null)}
              className="text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold shrink-0"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Cabeçalho Superior */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
          isDark
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white/90 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg tracking-tight">
                  Geo-To-Do • Lembrete de Tarefas Geolocalizadas
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                  PAM II — Projeto 2
                </span>
              </div>
              <p
                className={`text-xs ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Mapas com Geofence (Circle) • Notificações por Proximidade • Widget Top 3 • Sensor de Luz ({lux} lx)
              </p>
            </div>
          </div>

          {/* Seletor de Abas e Status Rápido */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('app')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'app'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              App Interativo (React)
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'code'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              Código React Native (Expo)
            </button>
            <button
              onClick={() => setSoundEnabled((s) => !s)}
              title={soundEnabled ? 'Som de Notificação Ativo' : 'Som Silenciado'}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 py-5">
        {activeTab === 'app' ? (
          <div className="space-y-5">
            {/* Linha Superior: Sensor de Luz (LightSensor) + Widget da Tela Inicial (Top 3 Mais Próximas) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Card 1: Sensor de Luz Ambiente (LightSensor) */}
              <section
                className={`lg:col-span-5 rounded-2xl border p-4 transition-colors ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {isDark ? (
                      <Moon className="w-5 h-5 text-amber-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-amber-500" />
                    )}
                    <div>
                      <h2 className="font-bold text-sm">
                        Sensor de Luz (<code className="text-xs">LightSensor</code>)
                      </h2>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Alterna automaticamente entre tema claro e escuro
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      isDark
                        ? 'bg-indigo-950 text-indigo-300 border border-indigo-700'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {isDark ? '🌙 Tema Escuro' : '☀️ Tema Claro'}
                  </span>
                </div>

                {/* Leitura atual em Lux e Controle Deslizante */}
                <div
                  className={`p-3 rounded-xl border mb-3 ${
                    isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium">Iluminância Ambiente Atual:</span>
                    <span className="font-bold text-sm text-indigo-500">{lux} lux (lx)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="5"
                    value={lux}
                    onChange={(e) => {
                      setAutoTheme(true);
                      setLux(Number(e.target.value));
                    }}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>0 lx (Escuro)</span>
                    <span>Limiar: {luxThreshold} lx</span>
                    <span>1000 lx (Luz Solar)</span>
                  </div>
                </div>

                {/* Presets rápidos de ambiente */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
                  {[
                    { label: 'Noite (15 lx)', val: 15 },
                    { label: 'Penumbra (65 lx)', val: 65 },
                    { label: 'Sala/Aula (240 lx)', val: 240 },
                    { label: 'Sol Forte (850 lx)', val: 850 }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setAutoTheme(true);
                        setLux(preset.val);
                      }}
                      className={`px-2 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        lux === preset.val && autoTheme
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Modo Automático vs Manual */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-500/15">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAutoTheme((a) => !a)}
                      className={`px-2.5 py-1 rounded-lg font-semibold ${
                        autoTheme
                          ? 'bg-emerald-600 text-white'
                          : isDark
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {autoTheme ? 'Modo: Sensor Automático' : 'Modo: Manual'}
                    </button>
                    {!autoTheme && (
                      <button
                        onClick={() => setManualDark((d) => !d)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-semibold"
                      >
                        Alternar Tema
                      </button>
                    )}
                  </div>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                    Escuro se &lt; {luxThreshold} lx
                  </span>
                </div>
              </section>

              {/* Card 2: Widget da Tela Inicial — 3 Tarefas Pendentes Mais Próximas */}
              <section
                className={`lg:col-span-7 rounded-2xl border p-4 transition-colors ${
                  isDark
                    ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border-indigo-500/30'
                    : 'bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-slate-800 shadow-md'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-sm text-white">
                          Widget da Tela Inicial • 3 Tarefas Pendentes Mais Próximas
                        </h2>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-sky-500/20 text-sky-300 border border-sky-400/30">
                          react-native-android-widget
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Atualizado em tempo real conforme a distância GPS (Haversine)
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-400 font-semibold">
                      ● {insideCount} dentro do raio
                    </span>
                  </div>
                </div>

                {closestThreePending.length === 0 ? (
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center text-sm text-slate-300">
                    🎉 Todas as tarefas foram concluídas! Cadastre uma nova tarefa clicando no mapa.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {closestThreePending.map((task, index) => (
                      <div
                        key={task.id}
                        onClick={() => focusTaskOnMap(task)}
                        className={`cursor-pointer rounded-xl p-3 border transition-all ${
                          task.isInside
                            ? 'bg-emerald-500/20 border-emerald-400/60 shadow-lg shadow-emerald-950/50'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-extrabold bg-indigo-500 text-white">
                            #{index + 1}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              task.isInside
                                ? 'bg-emerald-400 text-slate-950 animate-pulse'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                            }`}
                          >
                            {formatDistance(task.distance)}
                          </span>
                        </div>
                        <p className="font-semibold text-xs text-white line-clamp-2 mb-1">
                          {task.title}
                        </p>
                        <p className="text-[11px] text-slate-300 truncate mb-2">
                          📍 {task.locationName}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
                          <span className="text-slate-300">Raio: {task.radius}m</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              teleportToTask(task);
                            }}
                            className="text-sky-300 hover:text-sky-200 font-semibold underline"
                          >
                            Simular Entrada
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Seção Central: Mapa Interativo com Geofences + Painel de Simulação GPS e Cadastro */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Coluna Esquerda (7 cols): Mapa Interativo + Controles de Simulação GPS/Polling */}
              <div className="lg:col-span-7 space-y-4">
                <div
                  className={`rounded-2xl border overflow-hidden transition-colors ${
                    isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  {/* Barra de Ferramentas do Mapa */}
                  <div className="p-3 border-b border-slate-500/15 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                        Modo de Clique no Mapa:
                      </span>
                      <button
                        onClick={() => setMapClickMode('newTask')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          mapClickMode === 'newTask'
                            ? 'bg-indigo-600 text-white'
                            : isDark
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        🎯 Selecionar Local da Tarefa
                      </button>
                      <button
                        onClick={() => setMapClickMode('moveGps')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          mapClickMode === 'moveGps'
                            ? 'bg-sky-600 text-white'
                            : isDark
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        🚶 Mover Minha Posição GPS
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleUseRealGeolocation}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border ${
                          isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <Crosshair className="w-3.5 h-3.5 text-sky-500" />
                        GPS Real
                      </button>
                    </div>
                  </div>

                  {/* Container do Mapa Leaflet com Altura Explícita */}
                  <div className="relative w-full" style={{ height: '420px' }}>
                    <div
                      ref={mapContainerRef}
                      className="w-full h-full z-10"
                      style={{ height: '420px', width: '100%' }}
                    />
                  </div>

                  {/* Barra de Status de Coordenadas e Simulação de Deslocamento (Polling) */}
                  <div
                    className={`p-3.5 border-t border-slate-500/15 space-y-3 ${
                      isDark ? 'bg-slate-950/60' : 'bg-slate-50'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-400 font-semibold border border-sky-500/30">
                          <Navigation className="w-3.5 h-3.5" />
                          GPS Atual: {userLocation.lat.toFixed(5)}, {userLocation.lng.toFixed(5)}
                        </span>
                        <span className={`truncate max-w-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          ({userLocation.label})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium ${
                            isPollingActive ? 'text-emerald-500' : 'text-slate-400'
                          }`}
                        >
                          <Radio className="w-3.5 h-3.5 animate-pulse" />
                          Polling ({pollingIntervalSec}s): #{pollingCount} às {lastPollTime}
                        </span>
                      </div>
                    </div>

                    {/* Controles de Movimentação Rápida para Testar o Geofence em Aula */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-500/10">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-semibold mr-1">Mover GPS (~80m):</span>
                        <button
                          onClick={() => moveUserByDelta(0.0007, 0, 'Norte')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                              : 'bg-white border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          ↑ Norte
                        </button>
                        <button
                          onClick={() => moveUserByDelta(-0.0007, 0, 'Sul')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                              : 'bg-white border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          ↓ Sul
                        </button>
                        <button
                          onClick={() => moveUserByDelta(0, -0.0007, 'Oeste')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                              : 'bg-white border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          ← Oeste
                        </button>
                        <button
                          onClick={() => moveUserByDelta(0, 0.0007, 'Leste')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                              : 'bg-white border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          → Leste
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsWalkingSim((w) => !w)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isWalkingSim
                              ? 'bg-amber-500 text-slate-950 shadow-md'
                              : 'bg-indigo-600 text-white hover:bg-indigo-500'
                          }`}
                        >
                          {isWalkingSim ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              Pausar Rota Simulada
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5" />
                              Simular Caminhada (Polling)
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Direita (5 cols): Formulário de Cadastro + Lista de Tarefas e Notificações */}
              <div className="lg:col-span-5 space-y-5">
                {/* Formulário de Nova Tarefa Geolocalizada */}
                <section
                  className={`rounded-2xl border p-4 transition-colors ${
                    isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-sm flex items-center gap-2">
                      <Plus className="w-4 h-4 text-indigo-500" />
                      Cadastrar Tarefa no Mapa (Geofence)
                    </h2>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
                      {draftCoord.lat.toFixed(4)}, {draftCoord.lng.toFixed(4)}
                    </span>
                  </div>

                  <form onSubmit={handleCreateTask} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Descrição do Lembrete / Tarefa *
                      </label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Ex.: Retirar encomenda nos Correios..."
                        className={`w-full px-3 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-indigo-500 ${
                          isDark
                            ? 'bg-slate-950 border-slate-700 text-slate-100'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          Nome do Local (ou clique no mapa)
                        </label>
                        <input
                          type="text"
                          value={newLocationName}
                          onChange={(e) => setNewLocationName(e.target.value)}
                          placeholder="Ex.: Av. Paulista, 1578"
                          className={`w-full px-3 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-indigo-500 ${
                            isDark
                              ? 'bg-slate-950 border-slate-700 text-slate-100'
                              : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          Categoria
                        </label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className={`w-full px-3 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-indigo-500 ${
                            isDark
                              ? 'bg-slate-950 border-slate-700 text-slate-100'
                              : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        >
                          <option value="Estudos">Estudos</option>
                          <option value="Acadêmico">Acadêmico</option>
                          <option value="Compras">Compras</option>
                          <option value="Saúde">Saúde</option>
                          <option value="Trabalho">Trabalho</option>
                        </select>
                      </div>
                    </div>

                    {/* Controle do Raio do Círculo (Geofence) */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold">
                          Raio do Círculo (<code className="text-[11px]">Circle</code> / Geofence):
                        </span>
                        <span className="font-bold text-indigo-500">{newRadius} metros</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="1500"
                        step="50"
                        value={newRadius}
                        onChange={(e) => setNewRadius(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                      <div className="flex gap-1.5 mt-1.5">
                        {[150, 250, 350, 500, 1000].map((r) => (
                          <button
                            type="button"
                            key={r}
                            onClick={() => setNewRadius(r)}
                            className={`flex-1 py-1 rounded-lg text-[11px] font-semibold border ${
                              newRadius === r
                                ? 'bg-indigo-600 text-white border-indigo-500'
                                : isDark
                                ? 'bg-slate-800 border-slate-700 text-slate-300'
                                : 'bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {r}m
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all"
                    >
                      + Adicionar Tarefa Geolocalizada no Mapa
                    </button>
                  </form>
                </section>

                {/* Lista de Tarefas Cadastradas */}
                <section
                  className={`rounded-2xl border p-4 transition-colors ${
                    isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h2 className="font-bold text-sm">
                      Tarefas Geolocalizadas ({pendingCount} pendentes)
                    </h2>
                    <div className="flex gap-1">
                      {[
                        { id: 'all', label: 'Todas' },
                        { id: 'pending', label: 'Pendentes' },
                        { id: 'inside', label: `No Raio (${insideCount})` },
                        { id: 'completed', label: 'Concluídas' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setFilterStatus(tab.id)}
                          className={`px-2 py-1 rounded-lg text-[11px] font-semibold ${
                            filterStatus === tab.id
                              ? 'bg-indigo-600 text-white'
                              : isDark
                              ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {filteredTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-3 rounded-xl border transition-all ${
                          task.isInside
                            ? isDark
                              ? 'bg-emerald-950/40 border-emerald-500/50'
                              : 'bg-emerald-50 border-emerald-300'
                            : isDark
                            ? 'bg-slate-950/60 border-slate-800'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <button
                            onClick={() => toggleTaskCompleted(task.id)}
                            className="mt-0.5 text-left flex items-start gap-2.5 flex-1 min-w-0"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            ) : (
                              <Circle
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  task.isInside ? 'text-emerald-500' : 'text-amber-500'
                                }`}
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <p
                                className={`text-xs font-bold leading-snug ${
                                  task.completed ? 'line-through opacity-60' : ''
                                }`}
                              >
                                {task.title}
                              </p>
                              <p
                                className={`text-[11px] truncate mt-0.5 ${
                                  isDark ? 'text-slate-400' : 'text-slate-500'
                                }`}
                              >
                                📍 {task.locationName}
                              </p>
                            </div>
                          </button>

                          <div className="flex items-center gap-1 shrink-0">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                task.isInside
                                  ? 'bg-emerald-500 text-white'
                                  : isDark
                                  ? 'bg-slate-800 text-slate-300'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {formatDistance(task.distance)} / {task.radius}m
                            </span>
                            <button
                              onClick={() => deleteTask(task.id)}
                              title="Excluir tarefa"
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-500/10 text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-medium">
                              {task.category}
                            </span>
                            {task.sourceUrl && (
                              <a
                                href={task.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-0.5 text-sky-400 hover:underline"
                              >
                                Coord. verificada <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => focusTaskOnMap(task)}
                              className="text-indigo-400 hover:underline font-medium"
                            >
                              Ver no Mapa
                            </button>
                            <button
                              onClick={() => teleportToTask(task)}
                              className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 font-semibold"
                            >
                              Ir para cá (Testar Alerta)
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Painel Inferior: Histórico de Notificações Disparadas (expo-notifications) */}
            <section
              className={`rounded-2xl border p-4 transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-500" />
                  <h2 className="font-bold text-sm">
                    Central de Notificações por Proximidade (<code className="text-xs">expo-notifications</code>)
                  </h2>
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={() => {
                      setNotifications([]);
                      notifiedTaskIdsRef.current.clear();
                    }}
                    className="text-xs text-rose-400 hover:underline font-semibold"
                  >
                    Limpar e Resetar Alertas
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Nenhuma notificação disparada ainda. Clique em <strong>"Ir para cá (Testar Alerta)"</strong> em qualquer tarefa ou ative <strong>"Simular Caminhada (Polling)"</strong> para entrar no perímetro de um lembrete!
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {notifications.slice(0, 6).map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-xl border text-xs ${
                        isDark
                          ? 'bg-emerald-950/30 border-emerald-500/30'
                          : 'bg-emerald-50 border-emerald-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-emerald-500 mb-1">
                        <span>🔔 Entrou no Geofence ({n.radius}m)</span>
                        <span>{n.timestamp}</span>
                      </div>
                      <p className="font-semibold truncate">{n.title}</p>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        {n.locationName} • Distância: {n.distance} m
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        ) : (
          /* Aba 2: Código-Fonte Completo React Native (Expo) para Entrega PAM II */
          <div
            className={`rounded-2xl border p-5 transition-colors ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-bold text-base">
                  Código-Fonte Completo em React Native (Expo) — PAM II
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Implementação com <code className="font-mono">react-native-maps</code> (<code className="font-mono">Circle</code>), <code className="font-mono">expo-location</code> (polling), <code className="font-mono">expo-notifications</code>, <code className="font-mono">react-native-android-widget</code> e <code className="font-mono">LightSensor</code> (<code className="font-mono">expo-sensors</code>).
                </p>
              </div>

              <div className="flex items-center gap-2">
                {Object.keys(REACT_NATIVE_FILES).map((fileName) => (
                  <button
                    key={fileName}
                    onClick={() => setSelectedCodeFile(fileName)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      selectedCodeFile === fileName
                        ? 'bg-indigo-600 text-white'
                        : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {fileName}
                  </button>
                ))}

                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  {copiedFile ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copiar {selectedCodeFile}
                    </>
                  )}
                </button>
              </div>
            </div>

            <pre
              className={`p-4 rounded-xl overflow-x-auto text-xs font-mono leading-relaxed border ${
                isDark
                  ? 'bg-slate-950 border-slate-800 text-slate-200'
                  : 'bg-slate-900 border-slate-800 text-slate-100'
              }`}
            >
              <code>{REACT_NATIVE_FILES[selectedCodeFile]}</code>
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}