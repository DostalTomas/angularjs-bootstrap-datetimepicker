export const YEAR_FORMAT = 'yyyy';
export const MONTH_FORMAT = 'LLL';
export const DAY_FORMAT = 'd';
export const TIME_FORMAT = 'T';
export const MINUTE_FORMAT = 'mm';
export const FULL_MONTH_FORMAT = 'LLL yyyy';
export const FULL_DAY_FORMAT = 'd LLL yyyy';
export const FULL_HOUR_FORMAT = 'd LLL yyyy H\':00\'';
export const FULL_MINUTE_FORMAT = 'd LLL yyyy H:mm';

export interface DateTimeLocalization {
    [lang: string]: { next: string; previous: string };
}

export const DEFAULT_LOCALIZATION: DateTimeLocalization = {
    'bg': {previous: 'предишна', next: 'следваща'},
    'ca': {previous: 'anterior', next: 'següent'},
    'da': {previous: 'forrige', next: 'næste'},
    'de': {previous: 'vorige', next: 'weiter'},
    'en-au': {previous: 'previous', next: 'next'},
    'en-gb': {previous: 'previous', next: 'next'},
    'en': {previous: 'previous', next: 'next'},
    'es-us': {previous: 'atrás', next: 'siguiente'},
    'es': {previous: 'atrás', next: 'siguiente'},
    'fi': {previous: 'edellinen', next: 'seuraava'},
    'fr': {previous: 'précédent', next: 'suivant'},
    'hu': {previous: 'előző', next: 'következő'},
    'it': {previous: 'precedente', next: 'successivo'},
    'ja': {previous: '前へ', next: '次へ'},
    'ml': {previous: 'മുൻപുള്ളത്', next: 'അടുത്തത്'},
    'nl': {previous: 'vorige', next: 'volgende'},
    'pl': {previous: 'poprzednia', next: 'następna'},
    'pt-br': {previous: 'anteriores', next: 'próximos'},
    'pt': {previous: 'anterior', next: 'próximo'},
    'ro': {previous: 'anterior', next: 'următor'},
    'ru': {previous: 'предыдущая', next: 'следующая'},
    'sk': {previous: 'predošlá', next: 'ďalšia'},
    'sv': {previous: 'föregående', next: 'nästa'},
    'tr': {previous: 'önceki', next: 'sonraki'},
    'uk': {previous: 'назад', next: 'далі'},
    'zh-cn': {previous: '上一页', next: '下一页'},
    'zh-tw': {previous: '上一頁', next: '下一頁'},
    'cs-cz': {previous: 'Předchozí', next: 'Další'}
};
