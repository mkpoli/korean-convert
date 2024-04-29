const UNICODE_OFFSET = 44032;
const UNICODE_MAX = 55215;

export const REVISED_ROMANIZATION_OF_KOREAN = {
	vowels: [
		'a', // ㅏ
		'ae', // ㅐ
		'ya', // ㅑ
		'yee', // ㅒ
		'eo', // ㅓ
		'e', // ㅔ
		'yeo', // ㅕ
		'ye', // ㅖ
		'o', // ㅗ
		'wa', // ㅘ
		'wae', // ㅙ
		'oe', // ㅚ
		'yo', // ㅛ
		'u', // ㅜ
		'wo', // ㅝ
		'we', // ㅞ
		'wi', // ㅟ
		'yu', // ㅠ
		'eu', // ㅡ
		'ui', // ㅢ
		'i' // ㅣ
	],
	consonants: {
		initial: [
			'g', // ㄱ
			'kk', // ㄲ
			'n', // ㄴ
			'd', // ㄷ
			'tt', // ㄸ
			'r', // ㄹ
			'm', // ㅁ
			'b', // ㅂ
			'pp', // ㅃ
			's', // ㅅ
			'ss', // ㅆ
			'', // ㅇ
			'j', // ㅈ
			'jj', // ㅉ
			'ch', // ㅊ
			'k', // ㅋ
			't', // ㅌ
			'p', // ㅍ
			'h' // ㅎ
		],
		final: [
			'',
			'k', // ㄱ
			'k', // ㄲ
			'kt', // ㄳ
			'n', // ㄴ
			'nt', // ㄵ
			'nh', // ㄶ
			't', // ㄷ
			'l', // ㄹ
			'lk', // ㄺ
			'lm', // ㄻ
			'lp', // ㄼ
			'lt', // ㄽ
			'lt', // ㄾ
			'lp', // ㄿ
			'lh', // ㅀ
			'm', // ㅁ
			'p', // ㅂ
			'pt', // ㅄ
			't', // ㅅ
			'tt', // ㅆ
			'ng', // ㅇ
			't', // ㅈ
			't', // ㅊ
			'k', // ㅋ
			't', // ㅌ
			'p', // ㅍ
			'h' // ㅎ
		]
	}
};

type Syllable = [
	/// Initial consonant (初聲 초성)
	onset: string,
	/// Medial vowel (中聲 중성)
	nucleus: string,
	/// Final consonant (終聲 종성)
	coda: string
];

const UNICODE_HANGUL_SYLLABLE_BASE = 0xac00;
const UNICODE_HANGUL_INITIAL_BASE = 0x1100;
const UNICODE_HANGUL_MEDIAL_BASE = 0x1161;
const UNICODE_HANGUL_FINAL_BASE = 0x11a7;
const HANGUL_INITIAL_COUNT = 19;
const HANGUL_MEDIAL_COUNT = 21;
const HANGUL_FINAL_COUNT = 28;
const HANGUL_NUCLEUS_CODA_COUNT = HANGUL_MEDIAL_COUNT * HANGUL_FINAL_COUNT; // 588
const HANGUL_SYLLABLE_COUNT = HANGUL_INITIAL_COUNT * HANGUL_NUCLEUS_CODA_COUNT; // 11,172

/**
 * Separates a single Hangul syllable into its onset (initial), nucleus (medial), and coda (final) parts.
 * @param hangul A single Hangul character.
 * @returns An object with properties `onset`, `nucleus`, and `coda` representing the parts of the Hangul syllable.
 */
function separateSyllable(hangul: string): Syllable {
	// return hangul.normalize('NFD').split('') as Syllable;
	// make sure [a, b, c] and, [a, b] are both 3 elements
	const normalized = hangul.normalize('NFD').split('');
	if (normalized.length === 2) {
		normalized.push('');
	} else if (normalized.length !== 3) {
		throw new Error(`Invalid Hangul Syllable "${hangul}"`);
	}
	return normalized as Syllable;

	// if (
	// 	hangul.length !== 1 ||
	// 	hangul.charCodeAt(0) < UNICODE_HANGUL_SYLLABLE_BASE ||
	// 	hangul.charCodeAt(0) > UNICODE_HANGUL_SYLLABLE_BASE + HANGUL_SYLLABLE_COUNT - 1
	// ) {
	// 	throw new Error(`Invalid Hangul Syllable "${hangul}"`);
	// }

	// const syllableIndex = hangul.charCodeAt(0) - UNICODE_HANGUL_SYLLABLE_BASE;
	// const onsetIndex = Math.floor(syllableIndex / HANGUL_NUCLEUS_CODA_COUNT);
	// const nucleusIndex = Math.floor(
	// 	(syllableIndex - onsetIndex * HANGUL_NUCLEUS_CODA_COUNT) / HANGUL_FINAL_COUNT
	// );
	// const codaIndex = syllableIndex % HANGUL_FINAL_COUNT;

	// // return {
	// // 	onset: String.fromCharCode(UNICODE_HANGUL_INITIAL_BASE + onsetIndex),
	// // 	nucleus: String.fromCharCode(UNICODE_HANGUL_MEDIAL_BASE + nucleusIndex),
	// // 	coda: codaIndex === 0 ? '' : String.fromCharCode(UNICODE_HANGUL_FINAL_BASE + codaIndex)
	// // };
}

const onsetMapping: Record<string, string> = {
	ᄀ: 'k',
	ᄁ: 'kk',
	ᄂ: 'n',
	ᄃ: 't',
	ᄄ: 'tt',
	ᄅ: 'r',
	ᄆ: 'm',
	ᄇ: 'p',
	ᄈ: 'pp',
	ᄉ: 's',
	ᄊ: 'ss',
	ᄋ: '',
	ᄌ: 'ch',
	ᄍ: 'jj',
	ᄎ: 'ch',
	ᄏ: 'kh',
	ᄐ: 'th',
	ᄑ: 'ph',
	ᄒ: 'h'
};

const nucleusMapping: Record<string, string> = {
	ᅡ: 'a',
	ᅢ: 'ae',
	ᅣ: 'ya',
	ᅤ: 'yae',
	ᅥ: 'ŏ',
	ᅦ: 'e',
	ᅧ: 'yŏ',
	ᅨ: 'ye',
	ᅩ: 'o',
	ᅪ: 'wa',
	ᅫ: 'wae',
	ᅬ: 'oi',
	ᅭ: 'yo',
	ᅮ: 'u',
	ᅯ: 'wŏ',
	ᅰ: 'we',
	ᅱ: 'wi',
	ᅲ: 'yu',
	ᅳ: 'ŭ',
	ᅴ: 'ŭi',
	ᅵ: 'i'
};

const codaMapping: Record<string, string> = {
	'': '',
	ᆨ: 'k',
	// ᆩ: 'kk',
	ᆩ: 'k',
	ᆪ: 'ks',
	ᆫ: 'n',
	ᆬ: 'nj',
	ᆭ: 'nh',
	ᆮ: 't',
	ᆯ: 'l',
	ᆰ: 'k',
	ᆱ: 'm',
	ᆲ: 'l',
	ᆳ: 'l',
	ᆴ: 'lt',
	ᆵ: 'lp',
	ᆶ: 'lh',
	ᆷ: 'm',
	ᆸ: 'p',
	ᆹ: 'ps',
	// ᆺ: 's',
	ᆺ: 't',
	// ᆻ: 'ss',
	ᆻ: 't',
	ᆼ: 'ng',
	ᆽ: 't',
	ᆾ: 't',
	ᆿ: 'k',
	ᇀ: 't',
	ᇁ: 'p',
	// ᇂ: 'h'
	ᇂ: 't'
};

const HangulSoundRules = new Map<string, string>([
	['ᆼᄀ', 'ngg'],
	['ᆼᄃ', 'ngd'],
	['ᆼᄅ', 'ngn'],
	['ᆼᄇ', 'ngb'],
	['ᆼᄌ', 'ngj'],
	['ᆫᄀ', 'ng'],
	['ᆫᄃ', 'nd'],
	['ᆫᄅ', 'nr'],
	['ᆫᄇ', 'nb'],
	['ᆫᄌ', 'nj'],
	['ᆫᄂ', 'll'],
	['ᆯᄀ', 'lg'],
	['ᄅᄂ', 'll'],
	['ᆯᄃ', 'ld'],
	['ᄅᄅ', 'll'],
	['ᆯᄇ', 'lb'],
	['ᆯᄌ', 'lj'],
	['ᆮᄋ', 'd'],
	['ᆮᄂ', 'nn'],
	['ᆮᄅ', 'nn'],
	['ᆮᄆ', 'nm'],
	['ᆮᄉ', 'ss'],
	['ᆾᄆ', 'nm'],
	['ᆷᄀ', 'mg'],
	['ᆷᄃ', 'md'],
	['ᆷᄅ', 'mn'],
	['ᆷᄇ', 'mb'],
	['ᆷᄌ', 'mj'],
	['ᆸᄋ', 'b'],
	['ᆸᄂ', 'mn'],
	['ᆸᄅ', 'mr'],
	['ᆸᄆ', 'mm'],
	['ᆹᄋ', 'bs'],
	['ᆺᄋ', 'ss'],
	['ᆻᄋ', 'ss'],
	['ᆬᄋ', 'nj'],
	['ᆭᄋ', 'nh'],
	['ᆰᄋ', 'lg'],
	['ᆱᄋ', 'lm'],
	['ᆲᄋ', 'lb'],
	['ᆳᄋ', 'ls'],
	['ᆴᄋ', 'th'],
	['ᆵᄋ', 'lph'],
	['ᆶᄋ', 'r'],
	['ᆨᄋ', 'g'],
	['ᆨᄂ', 'ngn'],
	['ᆨᄅ', 'ngn'],
	['ᆨᄆ', 'ngm']
]);

/**
 * Converts decomposed Hangul syllable parts to Romanized string, adjusting for voicing and specific sound rules.
 * @param hangulParts An array of tuples where each tuple represents the onset, nucleus, and coda of a Hangul syllable.
 * @returns A string with the Romanized version of the Hangul input.
 */
/**
 * Converts decomposed Hangul syllable parts to Romanized string, adjusting for voicing and specific sound rules.
 * @param hangulParts An array of tuples where each tuple represents the onset, nucleus, and coda of a Hangul syllable.
 * @returns A string with the Romanized version of the Hangul input.
 */
function romanizeHangul(hangulParts: [string, string, string][]): string {
	return hangulParts
		.map(([onset, nucleus, coda], index) => {
			let romanOnset = onsetMapping[onset];
			const romanNucleus = nucleusMapping[nucleus];
			let romanCoda = codaMapping[coda] ?? '';

			// Adjust for voicing of the onset when it follows a voiced sound
			if (index > 0 && romanNucleus) {
				const previousCoda = hangulParts[index - 1][2];
				if (codaMapping[previousCoda] === '') {
					if (onset === 'ᄀ') romanOnset = 'g';
					else if (onset === 'ᄃ') romanOnset = 'd';
					else if (onset === 'ᄇ') romanOnset = 'b';
				}
			}

			if (index > 0) {
				// Remove the initial if sound rule matched (because it already includes the onset)
				const previousCoda = hangulParts[index - 1][2];
				const ruleKey = previousCoda + onset;
				const soundRuleResult = HangulSoundRules.get(ruleKey as any);
				if (soundRuleResult) {
					romanOnset = '';
				}
			}

			// Apply specific sound rule adjustments between coda of the current syllable and onset of the next syllable
			if (index < hangulParts.length - 1) {
				const nextOnset = hangulParts[index + 1][0];
				const ruleKey = coda + nextOnset;
				console.log(`Checking rule: ${ruleKey}`);
				const soundRuleResult = HangulSoundRules.get(ruleKey as any);
				if (soundRuleResult) {
					console.log(`Rule matched: ${ruleKey} => ${soundRuleResult}`);
					romanCoda = soundRuleResult;
				}
			}

			return romanOnset + romanNucleus + romanCoda;
		})
		.join('');
}

/**
 * Converts a Hangul syllable into Revised Romanization of Korean.
 * @param hangul A single Hangul character.
 * @returns The Revised Romanization of Korean for the Hangul syllable.
 */
function convertSyllable(char: string) {
	console.log({ char });
	const syllable = separateSyllable(char);

	return syllable.join(' ');

	// const charCode = char.charCodeAt(0);
	// const isHangul = charCode >= UNICODE_OFFSET && charCode < UNICODE_MAX;
	// if (isHangul) {
	// 	let unicodeOffset = charCode - UNICODE_OFFSET;
	// 	const trailerOffset = unicodeOffset % REVISED_ROMANIZATION_OF_KOREAN.consonants.final.length;
	// 	unicodeOffset -= trailerOffset;
	// 	unicodeOffset /= REVISED_ROMANIZATION_OF_KOREAN.consonants.final.length;
	// 	const vowelOffset = unicodeOffset % REVISED_ROMANIZATION_OF_KOREAN.vowels.length;
	// 	unicodeOffset -= vowelOffset;
	// 	unicodeOffset /= REVISED_ROMANIZATION_OF_KOREAN.vowels.length;
	// 	const leadOffset = unicodeOffset;

	// 	const result =
	// 		REVISED_ROMANIZATION_OF_KOREAN.consonants.initial[leadOffset] +
	// 		REVISED_ROMANIZATION_OF_KOREAN.vowels[vowelOffset] +
	// 		REVISED_ROMANIZATION_OF_KOREAN.consonants.final[trailerOffset];
	// 	return result;
	// }
	// return char;
}

/**
 * Converts a Hangul string into DPRK Romanization.
 * @param hangul A string containing Hangul characters.
 */
export function convertHangulToDPRK(hangul: string): string {
	const segementer = new Intl.Segmenter('ko', { granularity: 'grapheme' });
	return hangul
		.split(/(\p{sc=Hangul}+)/u)
		.map((word) => {
			if (word.match(/\p{sc=Hangul}/u)) {
				const chars = [...segementer.segment(word)];
				try {
					return romanizeHangul(chars.map((char) => separateSyllable(char.segment)));
				} catch (error) {
					console.error(error);
					return word;
				}
				// return [...segementer.segment(word)].map((char) => convertSyllable(char.segment)).join('');
			} else {
				return word;
			}
		})
		.filter(Boolean)
		.join('');
}
