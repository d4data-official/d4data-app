import { useContext, useCallback, useMemo } from 'react';
import { GlobalContext } from 'renderer/context/Store';

interface Dictionary {
  homepage: {
    header: string,
    description: string,
    dropzone: string,
    historyTitle: string,
    historyButton: string,
  },
  history: {
    delete: string,
    restore: string,
    reset: string,
  },
  settings: {
    title: string,
    theme: string,
    display: string,
    language: string,
    ergonomic: string,
    raw: string,
  },
  overview: {
    about: string,
    service: string,
    size: string,
    note: string,
    score: string,
    noteDescription: string,
    scoreDescription: string,
    date: string,
  },
  navbar: {
    available: string,
    unavailable: string,
    loading: string,
  }
  getters: {
    profile: string,
    friends: string,
    followings: string,
    followers: string,
    contacts: string,
    whereabouts: string,
    notifications: string,
    chats: string,
    chatmessages: string,
    comments: string,
    posts: string,
    messages: string,
    apis: string,
    connections: string,
    communities: string,
    settings: string,
    reacted: string,
    medias: string,
    notes: string,
    transactions: string,
    browserdata: string,
    tasks: string,
    authorizeddevices: string,
    mails: string,
    events: string,
    [k: string]: string
  }
  // [k: string]: {
  //   [k: string]: string
  // }
}

interface Dictionaries {
  [k: string]: Dictionary;
}

const dictionaries: Dictionaries = {
  en: {
    homepage: {
      header: 'Visualize your personal data in just one click !',
      description: 'D4Data is the secure interface to convert non-human readable '
        + 'data to an intuitive user interface where anybody can understand its digital fingerprint.',
      dropzone: 'Click to select your GDPR archive or drop it here',
      historyTitle: 'Last archive processed',
      historyButton: 'Show complete history',
    },
    history: {
      delete: 'Delete',
      restore: 'Restore',
      reset: 'Reset history',
    },
    settings: {
      title: 'Settings',
      theme: 'Theme',
      display: 'Display type',
      language: 'Language',
      ergonomic: 'Ergonomic',
      raw: 'Raw',
    },
    overview: {
      about: 'About your archive',
      service: 'Service',
      size: 'Archive size',
      note: 'Note from the team',
      score: 'GDPR score (coming soon)',
      noteDescription: 'This section will help you know more about the services you are using and their data policies.',
      scoreDescription: 'D4Data will set a score for each supported services. More to come during the release!',
      date: 'Created',
    },
    navbar: {
      available: 'Available Data',
      unavailable: 'Unavailable Data',
      loading: 'Processing...',
    },
    getters: {
      profile: 'Profile',
      friends: 'Friends',
      followings: 'Followings',
      followers: 'Followers',
      contacts: 'Contacts',
      whereabouts: 'Whereabouts',
      notifications: 'Notifications',
      chats: 'Chats',
      chatmessages: 'Chat Messages',
      comments: 'Comments',
      posts: 'Posts',
      messages: 'Messages',
      apis: 'Linked Applications',
      connections: 'Connections',
      communities: 'Communities',
      settings: 'Settings',
      reacted: 'Reacted',
      medias: 'Medias',
      notes: 'Notes',
      transactions: 'Transactions',
      browserdata: 'Browser Datas',
      tasks: 'Tasks',
      authorizeddevices: 'Authorized Devices',
      mails: 'Mails',
      events: 'Events',
    },
  },
  fr: {
    homepage: {
      header: 'Visualisez vos données personnelles en un seul clic !',
      description: 'D4Data est l\'interface sécurisée qui permet de convertir des données non lisibles par '
        + 'l\'homme en une interface utilisateur intuitive où chacun peut comprendre son empreinte numérique.'
        + ' peut comprendre son empreinte numérique.',
      dropzone: 'Cliquez pour sélectionner votre archive GDPR ou déposez-la ici',
      historyTitle: 'Dernière archive traitée',
      historyButton: 'Afficher l\'historique complet',
    },
    history: {
      delete: 'Supprimer',
      restore: 'Restaurer',
      reset: 'Supprimer l\'historique',
    },
    settings: {
      title: 'Réglages',
      theme: 'Thème',
      display: 'Type d\'affichage',
      language: 'Langue',
      ergonomic: 'Ergonomique',
      raw: 'Brut',
    },
    overview: {
      about: 'À propos de votre archive',
      service: 'Service',
      size: 'Taille de l\'archive',
      note: 'Note de l\'équipe',
      score: 'Score RGPD (bientôt disponible)',
      noteDescription: 'Cette section vous aidera à en savoir plus sur les '
        + 'services que vous utilisez et leur politique en matière de données',
      scoreDescription: 'D4Data va définir un score pour chaque service supporté.'
        + ' Plus d\'informations à venir lors de la sortie de la version !',
      date: 'Crée',
    },
    navbar: {
      available: 'Données disponibles',
      unavailable: 'Données indisponibles',
      loading: 'En cours de traitement...',
    },
    getters: {
      profile: 'Profile',
      friends: 'Amis',
      followings: 'Abonnements',
      followers: 'Abonnés',
      contacts: 'Contacts',
      whereabouts: 'Positions',
      notifications: 'Notifications',
      chats: 'Discussions',
      chatmessages: 'Messages',
      comments: 'Commentaires',
      posts: 'Postes',
      messages: 'Messages',
      apis: 'Applications Connectées',
      connections: 'Connections',
      communities: 'Communautés',
      settings: 'Réglages',
      reacted: 'Reactions',
      medias: 'Medias',
      notes: 'Notes',
      transactions: 'Transactions',
      browserdata: 'Données de Navigation',
      tasks: 'Tâches',
      authorizeddevices: 'Appareils autorisés',
      mails: 'Mails',
      events: 'Événements',
    },
  },
};

export default function Trans<P extends keyof Dictionary, K extends keyof Dictionary[P]>(
  { page, section, template = '{{template}}' }: {
    page: P, section: K, template?: string
  },
): JSX.Element {
  const { language } = useContext(GlobalContext);

  const translation = useMemo(
    () => template.replace('{{template}}', dictionaries[language.key][page][section] as unknown as string),
    [language],
  );
  return <>{translation}</>;
}

export function useTranslation() {
  const { language } = useContext(GlobalContext);

  const translate = useCallback(
    <P extends keyof Dictionary, K extends keyof Dictionary[P]>(p: P, k: K): string => (
      dictionaries[language.key][p][k] as unknown as string
    ),
    [language],
  )
  return translate;
}
