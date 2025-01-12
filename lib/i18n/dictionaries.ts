export type Locale = "en" | "fr" | "ar";

export interface Dictionary {
  home: {
    title: string;
    description: string;
    search: string;
    popularRoutes: string;
    findTrain: string;
    departure: string;
    destination: string;
    searchButton: string;
    loading: string;
    noSchedules: string;
    contributorNote: string;
  };
  routes: {
    title: string;
    description: string;
    noSchedules: string;
    contribute: string;
    scheduleEditor: {
      title: string;
      departure: string;
      arrival: string;
      price: string;
      submit: string;
      success: string;
      error: string;
    };
  };
}

const en: Dictionary = {
  home: {
    title: "Algeria Train Schedules",
    description: "Find train schedules between Algerian provinces",
    search: "Search",
    popularRoutes: "Popular Routes",
    findTrain: "Find a Train",
    departure: "Departure",
    destination: "Destination",
    searchButton: "Search Schedules",
    loading: "Loading...",
    noSchedules: "No schedules found",
    contributorNote: "All schedules are contributed by users like you :)",
  },
  routes: {
    title: "Train Schedules",
    description: "Train schedules from {from} to {to}",
    noSchedules: "No schedules found for this route",
    contribute: "Know the schedule? Help others by sharing it!",
    scheduleEditor: {
      title: "Add Schedule",
      departure: "Departure Time",
      arrival: "Arrival Time",
      price: "Price (DZD)",
      submit: "Add Schedule",
      success: "Schedule added successfully",
      error: "Failed to add schedule",
    },
  },
};

const fr: Dictionary = {
  home: {
    title: "Horaires des Trains en Algérie",
    description:
      "Trouvez les horaires des trains entre les wilayas algériennes",
    search: "Rechercher",
    popularRoutes: "Routes Populaires",
    findTrain: "Trouver un Train",
    departure: "Départ",
    destination: "Destination",
    searchButton: "Rechercher les Horaires",
    loading: "Chargement...",
    noSchedules: "Aucun horaire trouvé",
    contributorNote:
      "Tous les horaires sont contribués par des utilisateurs comme vous :)",
  },
  routes: {
    title: "Horaires des Trains",
    description: "Horaires des trains de {from} à {to}",
    noSchedules: "Aucun horaire trouvé pour cette route",
    contribute:
      "Vous connaissez l'horaire ? Aidez les autres en le partageant !",
    scheduleEditor: {
      title: "Ajouter un Horaire",
      departure: "Heure de Départ",
      arrival: "Heure d'Arrivée",
      price: "Prix (DZD)",
      submit: "Ajouter l'Horaire",
      success: "Horaire ajouté avec succès",
      error: "Échec de l'ajout de l'horaire",
    },
  },
};

const ar: Dictionary = {
  home: {
    title: "مواعيد القطارات في الجزائر",
    description: "ابحث عن مواعيد القطارات بين الولايات الجزائرية",
    search: "بحث",
    popularRoutes: "المسارات الشائعة",
    findTrain: "ابحث عن قطار",
    departure: "المغادرة",
    destination: "الوجهة",
    searchButton: "بحث عن المواعيد",
    loading: "جاري التحميل...",
    noSchedules: "لم يتم العثور على مواعيد",
    contributorNote: "جميع المواعيد مساهمة من مستخدمين مثلك :)",
  },
  routes: {
    title: "مواعيد القطارات",
    description: "مواعيد القطارات من {from} إلى {to}",
    noSchedules: "لم يتم العثور على مواعيد لهذا المسار",
    contribute: "هل تعرف الموعد؟ ساعد الآخرين بمشاركته!",
    scheduleEditor: {
      title: "إضافة موعد",
      departure: "وقت المغادرة",
      arrival: "وقت الوصول",
      price: "السعر (دج)",
      submit: "إضافة الموعد",
      success: "تمت إضافة الموعد بنجاح",
      error: "فشل في إضافة الموعد",
    },
  },
};

export const dictionaries = {
  en,
  fr,
  ar,
};
