import { Routine } from '../types';
import {
  heroImg,
  breathImg,
  mobilityImg,
  teaImg,
  bandsImg,
  dumbbellsImg,
  lungesImg,
} from './postpartumData';

export interface HabitCapsule {
  id: string;
  title: string;
  subtitle: string;
  category: 'culpa' | 'habito' | 'nutricion' | 'biomecanica';
  readTime: string;
  summary: string;
  paragraphs: string[];
  actionableStep: string;
}

export interface FunctionalTestQuestion {
  id: string;
  question: string;
  context: string;
  options: {
    label: string;
    score: number;
    description: string;
  }[];
}

export const RENACER_ROUTINES: Routine[] = [
  // FASE 1: DESPERTAR POSTURAL Y LIBERACIÓN (Semanas 1-4)
  {
    id: 'renacer-despertar-postural',
    title: 'Despertar Postural Express & Liberación Dorsal',
    subtitle: 'Fase 1 · Semanas 1 a 4: Despertar Postural y Liberación',
    category: 'renacer-funcional',
    durationMinutes: 8,
    intensity: 'Restaurador',
    image: mobilityImg,
    description:
      'Diseñada especialmente para mujeres que llevan años sin entrenar. Contrarresta las largas horas sentadas frente al ordenador, las cargas acumuladas y el encorvamiento dorsal, despertando el core profundo en solo 8 minutos.',
    suitableFromWeek: 1,
    targetMuscles: ['Columna dorsal', 'Pectorales acortados', 'Transverso abdominal', 'Cervicales'],
    safeForCesarean: true,
    clinicalPrecautions:
      'Muévete despacio y sin forzar rangos articulares. No debe haber dolor punzante; busca solo una sensación placentera de espacio y descompresión.',
    purpose: 'Liberar tensión dorsal crónica y reconectar con la respiración profunda.',
    mindfulClosing:
      'Has regalado 8 minutos de amor a tu estructura corporal. No hay prisa: tu cuerpo recuerda cómo sentirse erguido y liviano.',
    steps: [
      {
        title: 'Descompresión Torácica en Silla o Pared',
        durationSeconds: 120,
        instruction:
          'Apoya las palmas en el respaldo de una silla firme o pared. Da dos pasos atrás y flexiona suavemente las caderas permitiendo que el pecho descienda entre los brazos.',
        breathingCue:
          'Inhala expandiendo las costillas hacia la espalda. Exhala dejando caer suavemente el esternón hacia el suelo.',
        clinicalTip:
          'Abre espacio entre vértebras torácicas que llevan años encorvadas cargando a los niños o frente a pantallas.',
      },
      {
        title: 'Gato-Vaca Suave con Foco en Abdomen Profundo',
        durationSeconds: 120,
        instruction:
          'En cuatro apoyos sobre colchoneta acolchada (o sobre la cama). Articula la columna lentamente desde el cóccix hasta la coronilla.',
        breathingCue:
          'Inhala abriendo la mirada al frente sin quebrar el cuello. Exhala redondeando y abrazando suavemente el ombligo hacia la columna.',
        clinicalTip:
          'No busques una flexión extrema; enfócate en sentir cómo el abdomen se activa suavemente al botar el aire.',
      },
      {
        title: 'Apertura de Pecho en Libro Abierto',
        durationSeconds: 120,
        instruction:
          'Túmbate de costado con rodillas flexionadas a 90°. Abre el brazo superior hacia el lado opuesto como si abrieras las páginas de un libro.',
        breathingCue:
          'Exhala al abrir y rotar suavemente el pecho hacia el techo. Inhala sintiendo la amplitud en tus pulmones.',
        clinicalTip:
          'Alivia de inmediato la sobrecarga en hombros y trapecios típica del porteo y el trabajo sedentario.',
      },
      {
        title: 'Abrazo Abdominal Sentada con Conexión Pélvica',
        durationSeconds: 120,
        instruction:
          'Siéntate erguida con las plantas apoyadas en el suelo. Coloca una mano en tus costillas y otra en el bajo vientre.',
        breathingCue:
          'Inhala sintiendo cómo el aire llena las costillas a 360°. Al exhalar en 5 segundos, imagina que recoges suavemente el suelo pélvico y el transverso.',
        clinicalTip:
          'Esta activación sutil es el cimiento para que tu faja abdominal vuelva a trabajar en tu día a día sin impacto.',
        isContractionHold: true,
      },
    ],
  },
  {
    id: 'renacer-liberacion-cadera',
    title: 'Descompresión Lumbar y Movilidad de Cadera',
    subtitle: 'Fase 1 · Semanas 1 a 4: Liberación de Caderas Rígidas',
    category: 'renacer-funcional',
    durationMinutes: 10,
    intensity: 'Suave',
    image: breathImg,
    description:
      'Años de sedentarismo y tareas del hogar bloquean las caderas y transfieren toda la sobrecarga a la zona lumbar. Esta secuencia desbloquea la pelvis y alivia la pesadez de espalda.',
    suitableFromWeek: 1,
    targetMuscles: ['Flexores de cadera (Psoas)', 'Glúteo medio', 'Zona lumbosacra', 'Fascia pélvica'],
    safeForCesarean: true,
    clinicalPrecautions:
      'Mantén apoyos acolchados debajo de las rodillas. Evita forzar las rodillas si sientes tensión articular.',
    purpose: 'Descomprimir la zona lumbar y restablecer la movilidad de la pelvis.',
    mindfulClosing:
      'Cada articulación de tu cadera está recibiendo oxígeno fresco y nutrición. Tu espalda te lo agradecerá durante todo el día.',
    steps: [
      {
        title: 'Movilidad de Cadera 90/90 Asistida',
        durationSeconds: 150,
        instruction:
          'Sentada en el suelo con manos apoyadas detrás para soporte. Coloca ambas piernas flexionadas a 90° y balancea suavemente las rodillas de un lado a otro.',
        breathingCue:
          'Exhala al cambiar de lado lentamente. Inhala en el centro con la columna erguida.',
        clinicalTip:
          'Trabaja la rotación interna y externa de cadera, esencial para liberar la presión en el sacro.',
      },
      {
        title: 'Puente Glúteo Suave con Apoyo en Talones',
        durationSeconds: 150,
        instruction:
          'Tumbada boca arriba con rodillas dobladas. Presiona los talones y eleva la pelvis unos centímetros hasta alinear cadera con tronco.',
        breathingCue:
          'Exhala al elevar contrayendo suavemente los glúteos. Inhala al descender vértebra por vértebra.',
        clinicalTip:
          'Los glúteos son el mejor escudo protector de tus lumbares. Despertarlos es clave para eliminar el dolor de espalda.',
        isContractionHold: true,
      },
      {
        title: 'Estiramiento del Psoas en Caballero con Pelvis Neutra',
        durationSeconds: 150,
        instruction:
          'Da un paso adelante con una pierna en ángulo de 90° y apoya la rodilla trasera en un cojín. Bascula la pelvis ligeramente hacia atrás (retroversión).',
        breathingCue:
          'Respira de forma continua sintiendo el alargamiento en la parte frontal de la cadera retrasada.',
        clinicalTip:
          'No empujes la cadera hacia adelante arqueando la espalda baja; la clave está en meter el cóccix hacia adentro.',
      },
      {
        title: 'Descanso en Balasana con Rodillas Separadas',
        durationSeconds: 150,
        instruction:
          'Separa las rodillas al ancho de la colchoneta, junta los dedos gordos de los pies y lleva los glúteos hacia los talones, descansando la frente en una almohada.',
        breathingCue:
          'Inhala profundo hacia la espalda baja y el suelo pélvico. Exhala soltando todo el peso hacia el suelo.',
        clinicalTip:
          'Permite que el periné se relaje por completo y se libere la tensión acumulada de días intensos.',
      },
    ],
  },

  // FASE 2: FUERZA FUNCIONAL PARA EL DÍA A DÍA (Semanas 5-8)
  {
    id: 'renacer-fuerza-cotidiana',
    title: 'Fuerza para la Vida Cotidiana: Cargar y Agacharse Sin Dolor',
    subtitle: 'Fase 2 · Semanas 5 a 8: Biomecánica del Día a Día',
    category: 'renacer-funcional',
    durationMinutes: 10,
    intensity: 'Moderado',
    image: heroImg,
    description:
      'Enfocada en los movimientos que realizas decenas de veces al día: recoger juguetes del suelo, levantar la compra o alzar a los niños. Aprende a distribuir la carga en tus piernas y glúteos en vez de quebrar tus lumbares.',
    suitableFromWeek: 5,
    targetMuscles: ['Cuádriceps', 'Glúteo mayor', 'Faja abdominal profunda', 'Erectores dorsales'],
    safeForCesarean: true,
    clinicalPrecautions:
      'Exhala siempre en la fase de subida o esfuerzo. No contengas la respiración ni empujes el abdomen hacia afuera.',
    purpose: 'Aprender la técnica de bisagra y sentadilla para cargar objetos y niños con seguridad.',
    mindfulClosing:
      'Tu fuerza no es para un espejo: es para vivir tu día con vitalidad, energía y libertad de movimiento.',
    steps: [
      {
        title: 'Sentadilla Asistida a la Silla (Box Squat)',
        durationSeconds: 150,
        setsReps: '3 series x 10 repeticiones con pausa de control',
        instruction:
          'Párate frente a una silla con pies al ancho de hombros. Lleva las caderas hacia atrás como si fueras a sentarte, toca el asiento y vuelve a erguirte con fuerza.',
        breathingCue:
          'Inhala al descender manteniendo el pecho erguido. Exhala al subir empujando el suelo con los talones y activando glúteos.',
        clinicalTip:
          'La silla te da confianza y seguridad biomecánica para no sobrecargar las rodillas ni la espalda baja.',
      },
      {
        title: 'Bisagra de Cadera Guiada a la Pared (Hip Hinge)',
        durationSeconds: 150,
        setsReps: '3 series x 10 repeticiones',
        instruction:
          'Párate a un palmo de espaldas a la pared. Con las rodillas suaves (microflexionadas), empuja las caderas hacia atrás hasta rozar la pared con los glúteos manteniendo la columna recta.',
        breathingCue:
          'Inhala al doblar desde la ingle. Exhala al volver a la vertical sintiendo la fuerza en isquiotibiales y glúteos.',
        clinicalTip:
          'Este es el movimiento exacto que debes usar para recoger bolsas o juguetes del suelo: dobla la cadera, nunca la espalda baja.',
      },
      {
        title: 'Empujes de Pared con Abdomen Conectado (Wall Push-ups)',
        durationSeconds: 150,
        setsReps: '3 series x 10 repeticiones',
        instruction:
          'Apoya las manos en la pared a la altura de los hombros. Flexiona los codos en un ángulo de 45° acercando el pecho a la pared y empuja con control.',
        breathingCue:
          'Inhala al acercarte a la pared. Exhala al empujar activando suavemente el abdomen.',
        clinicalTip:
          'Fortalece brazos y pecho sin someter la pared abdominal a la presión desmedida de las planchas en el suelo.',
      },
      {
        title: 'Descarga Dorsal y Alargamiento Axial',
        durationSeconds: 150,
        instruction:
          'Entrelaza las manos al frente y empuja las palmas hacia adelante mientras redondeas suavemente la espalda alta. Luego eleva los brazos al cielo inhalando amplitud.',
        breathingCue:
          'Respira con cadencia tranquila soltando cualquier tensión en mandíbula y cuello.',
        clinicalTip:
          'Reajusta la postura corporal antes de retomar tus actividades del hogar o del trabajo.',
      },
    ],
  },
  {
    id: 'renacer-estabilidad-pelvica',
    title: 'Estabilidad Pélvica y Caderas Firmes',
    subtitle: 'Fase 2 · Semanas 5 a 8: El Escudo de tu Suelo Pélvico',
    category: 'renacer-funcional',
    durationMinutes: 10,
    intensity: 'Moderado',
    image: bandsImg,
    description:
      'Un suelo pélvico que lleva años desconectado necesita el soporte de caderas y glúteos fuertes. Esta rutina despierta los estabilizadores laterales sin saltos ni impacto.',
    suitableFromWeek: 5,
    targetMuscles: ['Glúteo medio', 'Rotadores de cadera', 'Multífidos', 'Transverso abdominal'],
    safeForCesarean: true,
    clinicalPrecautions:
      'Mantén la pelvis estable sin balancearte de lado a lado durante las elevaciones.',
    purpose: 'Estabilizar la marcha, mejorar el equilibrio y blindar la pelvis frente a escapes de orina o dolor.',
    mindfulClosing:
      'Poco a poco, tus caderas se convierten en un soporte firme y confiable para tu día a día.',
    steps: [
      {
        title: 'Clamshell (Apertura de Almeja) en Decúbito Lateral',
        durationSeconds: 150,
        setsReps: '3 series x 12 repeticiones por lado',
        instruction:
          'Tumbada de lado con rodillas flexionadas y talones juntos. Abre la rodilla superior sin dejar que la cadera rote hacia atrás.',
        breathingCue:
          'Exhala al abrir la rodilla con lentitud. Inhala al cerrar suavemente.',
        clinicalTip:
          'Coloca la mano superior sobre tu cadera para asegurarte de que permanezca completamente quieta.',
      },
      {
        title: 'Bird-Dog Modificado (Conexión Cruzada en Cuatro Apoyos)',
        durationSeconds: 150,
        setsReps: '3 series x 8 repeticiones alternadas',
        instruction:
          'Desde cuatro apoyos, desliza el brazo derecho hacia adelante y la pierna izquierda hacia atrás sin arquear la zona lumbar.',
        breathingCue:
          'Exhala al extender y sostén 2 segundos. Inhala al regresar al centro con suavidad.',
        clinicalTip:
          'Imagina que tienes una taza de té caliente sobre tu espalda baja y no quieres derramar ni una sola gota.',
        isContractionHold: true,
      },
      {
        title: 'Elevación de Talones y Alcance Vertical',
        durationSeconds: 150,
        setsReps: '3 series x 12 repeticiones',
        instruction:
          'De pie cerca de una pared por si necesitas equilibrio. Eleva los talones activando gemelos y estira un brazo hacia el techo alternando.',
        breathingCue:
          'Inhala abajo. Exhala al elevarte sintiendo cómo el suelo pélvico se recoge naturalmente hacia arriba.',
        clinicalTip:
          'Estimula el retorno venoso en piernas cansadas y reactiva los propioceptores del pie.',
      },
      {
        title: 'Pausa de Cierre y Agradecimiento Corporal',
        durationSeconds: 150,
        instruction:
          'Coloca una mano en tu pecho y otra en tu abdomen. Cierra los ojos y siente cómo tu cuerpo agradece haber sido movido con gentileza.',
        breathingCue:
          '4 segundos de inhalación profunda, 6 segundos de exhalación lenta.',
        clinicalTip:
          'La constancia vence a la intensidad. Has dado el paso más importante: iniciar.',
      },
    ],
  },

  // FASE 3: VITALIDAD Y RESISTENCIA SOSTENIBLE (Semanas 9+)
  {
    id: 'renacer-vitalidad-bajo-impacto',
    title: 'Vitalidad Activa: Intervalos de Bajo Impacto',
    subtitle: 'Fase 3 · Semanas 9 en adelante: Energía y Resistencia Sostenible',
    category: 'renacer-funcional',
    durationMinutes: 12,
    intensity: 'Intermedio',
    image: lungesImg,
    description:
      'La transición hacia una mayor resistencia cardiovascular y muscular. Intervalos suaves de bajo impacto que activan la circulación, queman energía y liberan endorfinas sin castigar tus articulaciones ni tu suelo pélvico.',
    suitableFromWeek: 9,
    targetMuscles: ['Capacidad aeróbica funcional', 'Piernas y glúteos', 'Core postural', 'Tren superior'],
    safeForCesarean: true,
    clinicalPrecautions:
      'Mantén siempre al menos un pie en contacto con el suelo. Cero impacto de choque en la pelvis.',
    purpose: 'Aumentar la resistencia para subir escaleras y rendir todo el día sin agotamiento.',
    mindfulClosing:
      'Tu energía vital está renaciendo. La constancia de estas semanas ha reconstruido tus cimientos.',
    steps: [
      {
        title: 'Marcha en el Sitio con Braceo Amplio y Conexión Respiratoria',
        durationSeconds: 150,
        instruction:
          'Marcha en el lugar elevando rodillas a altura cómoda, acompañando con un braceo fluido y hombros relajados.',
        breathingCue:
          'Inhala en dos pasos, exhala en dos pasos. Mantén el ritmo cardíaco en una zona cómoda donde puedas hablar.',
        clinicalTip:
          'Despierta el sistema cardiovascular sin impacto de choque en la pelvis ni en los tobillos.',
      },
      {
        title: 'Sentadilla Dinámica con Elevación de Talones',
        durationSeconds: 180,
        setsReps: '3 series x 10 repeticiones continuas',
        instruction:
          'Realiza una sentadilla suave y, al incorporarte con la fuerza de piernas, elévate sobre las puntas de los pies en un movimiento fluido.',
        breathingCue:
          'Inhala al bajar. Exhala con energía al subir transfiriendo la fuerza desde el suelo.',
        clinicalTip:
          'Entrena la cadena muscular posterior completa desde los gemelos hasta los glúteos.',
      },
      {
        title: 'Paso Lateral Dinámico con Apertura de Brazos (Step-Touch)',
        durationSeconds: 180,
        instruction:
          'Da un paso lateral a la derecha juntando el pie izquierdo y luego a la izquierda, abriendo y cerrando los brazos en cruz con energía.',
        breathingCue:
          'Respira de forma continua al compás del movimiento.',
        clinicalTip:
          'Excelente para la movilidad frontal y la coordinación neuromuscular.',
      },
      {
        title: 'Zancada Hacia Atrás Suave con Apoyo en Pared o Silla',
        durationSeconds: 150,
        setsReps: '2 series x 8 repeticiones por pierna',
        instruction:
          'Da un paso amplio hacia atrás flexionando suavemente ambas rodillas hasta donde te resulte cómodo y vuelve al centro empujando con el talón delantero.',
        breathingCue:
          'Inhala atrás, exhala al regresar al frente.',
        clinicalTip:
          'El paso atrás protege la rodilla y activa el glúteo sin forzar la articulación femoropatelar.',
      },
      {
        title: 'Cierre Consciente y Regulación del Sistema Nervioso',
        durationSeconds: 60,
        instruction:
          'Quédate de pie con los pies firmes en la colchoneta. Suelta los brazos y deja que el ritmo cardíaco descienda suavemente.',
        breathingCue:
          'Exhalaciones largas y profundas para activar el sistema parasimpático de recuperación.',
        clinicalTip:
          'Has completado una sesión de vitalidad real. Tu cuerpo está recuperando su vigor funcional.',
      },
    ],
  },
];

export const HABIT_CAPSULES: HabitCapsule[] = [
  {
    id: 'capsula-regla-10-min',
    title: 'La Regla de los 10 Minutos: Vencer la Resistencia Mental',
    subtitle: 'Por qué menos es más cuando llevas años sin entrenar',
    category: 'habito',
    readTime: '3 min de lectura',
    summary:
      'Para una mujer que lleva 2, 5 o 10 años sin hacer ejercicio constante, pensar en 1 hora de gimnasio activa una señal de alarma mental. La clave del éxito está en las micro-sesiones.',
    paragraphs: [
      'El cerebro humano resiste el cambio drástico. Cuando intentamos pasar del sedentarismo a rutinas de 60 minutos cinco días por semana, la sobrecarga física y el desgaste cognitivo provocan el abandono en menos de dos semanas.',
      'La regla de los 10 minutos se basa en la neurociencia del hábito: diez minutos diarios son tan accesibles que tu mente no puede inventar excusas para postergarlos. No necesitas ropa especial, ni desplazarte, ni descuidar tus responsabilidades.',
      'Diez minutos al día suman 70 minutos de movimiento funcional a la semana: suficiente para despertar el músculo transverso, aliviar el dolor lumbar crónico y transformar tu metabolismo basal sin agotarte.',
    ],
    actionableStep:
      'Hoy tu único objetivo no es batir un récord: es regalarte 8 a 10 minutos de movilidad antes de acostarte o al despertar. La constancia es tu mayor superpoder.',
  },
  {
    id: 'capsula-gestion-culpa',
    title: 'Soltar la Culpa Materna: Dedicarte Tiempo para Cuidar Mejor',
    subtitle: 'El autocuidado no es un lujo que le restas a tu familia, es el pilar que la sostiene',
    category: 'culpa',
    readTime: '4 min de lectura',
    summary:
      'Muchas madres sienten que cada minuto que se dedican a sí mismas es un minuto que "roban" a sus hijos o a su hogar. Desarmar esta culpa es el primer paso para sanar.',
    paragraphs: [
      'Vivimos en una cultura que romantiza el agotamiento maternal extremo. Sin embargo, no puedes servir agua desde una jarra vacía. Si vives con dolor de espalda, agotamiento crónico y desconexión física, tu paciencia, tu humor y tu vitalidad se ven mermadas a diario.',
      'Diez minutos diarios de estiramientos o respiración consciente no le quitan nada a tu familia; al contrario: les devuelven una madre más serena, con menos dolor físico, con más energía para jugar y con un modelo vivo de respeto hacia su propio cuerpo.',
      'No necesitas pedir permiso para cuidar el templo que sostiene tu vida. Hoy es el día uno para soltar la culpa y recuperar tu fuerza.',
    ],
    actionableStep:
      'Cuando sientas la tentación de cancelar tu sesión de 10 minutos por hacer una tarea doméstica más, repite mentalmente: "Cuidar mi cuerpo hoy me permite sostener a quienes amo mañana con salud y sin dolor".',
  },
  {
    id: 'capsula-biomecanica-madre',
    title: 'Biomecánica Maternal: Cargar Niños y Compras sin Destrozar la Espalda',
    subtitle: 'Cómo agacharte, levantar peso y sostener cargas en la vida real',
    category: 'biomecanica',
    readTime: '4 min de lectura',
    summary:
      'Levantar niños de 15 kg de la cuna o cargar 4 bolsas del supermercado es un levantamiento de peso de alto calibre. Aprende la técnica protectora para el día a día.',
    paragraphs: [
      'La mayoría de las contracturas lumbares y hernias en mujeres de más de 30 años no se producen en un gimnasio: se producen al levantar al niño del suelo con las piernas rectas y la columna encorvada, o al sacar la compra del maletero con un giro brusco.',
      'La regla de oro: La flexión debe venir de las caderas y las rodillas, jamás de la columna lumbar. Tus glúteos y cuádriceps son músculos gigantes diseñados para soportar carga; tus vértebras lumbares, no.',
      'Antes de levantar a tu hijo del suelo o de la cama: acércate lo más posible a su cuerpo (reducir el brazo de palanca), abre los pies al ancho de hombros, exhala abrazando tu abdomen y empuja el suelo con los talones.',
    ],
    actionableStep:
      'Cada vez que te agaches hoy a recoger algo del suelo, practica la bisagra de cadera: flexiona rodillas, echa la cadera atrás y mantén el pecho visible.',
  },
  {
    id: 'capsula-nutricion-energia',
    title: 'Nutrición Estable: Erradicar los Bajones de Energía de la Tarde',
    subtitle: 'Sin dietas restrictivas: cómo estabilizar la glucosa y nutrir la masa muscular',
    category: 'nutricion',
    readTime: '4 min de lectura',
    summary:
      'Las dietas restrictivas destruyen el metabolismo y disparan el cortisol en mujeres con fatiga. Descubre cómo alimentar tu energía de forma sostenible.',
    paragraphs: [
      '¿Sientes una caída brusca de energía a las 3 o 4 de la tarde que te pide café con azúcar o galletas? No es falta de fuerza de voluntad: es una montaña rusa de glucosa e insulina provocada por un desayuno deficiente en proteína y fibra.',
      'Cuando una mujer lleva años sin entrenar, su masa muscular suele haber disminuido (sarcopenia leve por sedentarismo). El músculo es el órgano metabólico por excelencia: cuanto más lo nutras con proteína de calidad, más estable será tu energía a lo largo del día.',
      'Evita dietas de choque que prometen pérdidas de peso mágicas a costa de tu vitalidad. En su lugar, asegura una porción de proteína (huevos, yogur griego, legumbres, tofu o pescado) en cada comida principal y acompáñala de hojas verdes y grasas saludables.',
    ],
    actionableStep:
      'Mañana por la mañana, añade una fuente de proteína real a tu desayuno antes de cualquier alimento dulce. Notarás la diferencia en tu energía de toda la jornada.',
  },
];

export const FUNCTIONAL_ASSESSMENT_QUESTIONS: FunctionalTestQuestion[] = [
  {
    id: 'q-tiempo-parto',
    question: '¿Cuánto tiempo ha transcurrido desde tu último parto?',
    context: 'Nos ayuda a calibrar la fase biológica exacta de tu cuerpo.',
    options: [
      { label: 'Menos de 6 meses', score: 1, description: 'Fase de postparto temprano' },
      { label: 'Entre 6 y 24 meses', score: 2, description: 'Fase de consolidación intermedia' },
      { label: 'Entre 2 y 5 años', score: 3, description: 'Renacer Funcional: Despertar postural prioritario' },
      { label: 'Más de 5 o 10 años', score: 4, description: 'Renacer Funcional: Reconstrucción de cimientos sin prisa' },
    ],
  },
  {
    id: 'q-dolor-lumbar',
    question: '¿Con qué frecuencia experimentas molestia o pesadez en la zona lumbar o espalda alta?',
    context: 'Evalúa la fatiga postural acumulada por tareas del hogar, porteo o sedentarismo.',
    options: [
      { label: 'Casi nunca o rara vez', score: 1, description: 'Buen soporte lumbopélvico' },
      { label: 'Al final de días largos o al cargar peso', score: 2, description: 'Sobrecarga postural leve' },
      { label: 'Frecuentemente (varias veces por semana)', score: 3, description: 'Rigidez y descompensación que requiere movilidad diaria' },
      { label: 'A diario o de forma crónica al levantarme', score: 4, description: 'Prioridad absoluta en descompresión y fortalecimiento de glúteos' },
    ],
  },
  {
    id: 'q-escaleras',
    question: 'Al subir dos tramos de escaleras o caminar a paso ligero, ¿cómo sientes tu cuerpo?',
    context: 'Mide la capacidad cardiorrespiratoria funcional y la resistencia muscular básica.',
    options: [
      { label: 'Con soltura y sin falta de aire notable', score: 1, description: 'Buena base aeróbica' },
      { label: 'Siento fatiga en las piernas pero respiro bien', score: 2, description: 'Falta tono muscular en tren inferior' },
      { label: 'Siento falta de aliento moderada y piernas pesadas', score: 3, description: 'Descondicionamiento moderado: ideal para Fase 1' },
      { label: 'Me agoto rápidamente y evito las escaleras', score: 4, description: 'Comenzar con la regla de los 10 min en Fase 1' },
    ],
  },
  {
    id: 'q-suelo-pelvico',
    question: '¿Notas escapes leves de orina al estornudar, reírte o sensación de pesadez pélvica?',
    context: 'Comprobación de la competencia y tono de la musculatura del periné.',
    options: [
      { label: 'No, ninguna sensación molesta ni escapes', score: 1, description: 'Suelo pélvico competente' },
      { label: 'Solo ocasionalmente al toser muy fuerte o saltar', score: 2, description: 'Leve pérdida de tono reflejo' },
      { label: 'Frecuentemente al correr, estornudar o alzar niños', score: 3, description: 'Necesidad de reconectar la respiración con el suelo pélvico' },
      { label: 'Siento pesadez hacia el final del día', score: 4, description: 'Priorizar posturas de descarga como Balasana y puente suave' },
    ],
  },
];
