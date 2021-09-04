import { useContext, useCallback } from 'react';
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
    theme: string,
    display: string,
    language: string,
    ergonomic: string,
    raw: string,
  },
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
      theme: 'Theme',
      display: 'Display type',
      language: 'Language',
      ergonomic: 'Ergonomic',
      raw: 'Raw',
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
      theme: 'Thème',
      display: 'Type d\'affichage',
      language: 'Langue',
      ergonomic: 'Ergonomique',
      raw: 'Brut',
    },
  },
};

export default function Trans<P extends keyof Dictionary, K extends keyof Dictionary[P]>(
  { page, section }: { page: P, section: K },
): JSX.Element {
  const { language } = useContext(GlobalContext);

  return <>{dictionaries[language.key][page][section]}</>;
}

export function useTranslation() {
  const { language } = useContext(GlobalContext);

  const translate = useCallback(
    <P extends keyof Dictionary, K extends keyof Dictionary[P]>(p: P, k: K) => dictionaries[language.key][p][k],
    [language],
  )
  return translate;
}
