<script lang="ts">
	import { convertHangulToDPRK } from 'koconv';
	import MdiTransferDown from '~icons/mdi/transfer-down';
	// import smartquotes from 'smartquotes';
	import { tick } from 'svelte';
	// import Suggestions from './Suggestions.svelte';

	// import { dictionary } from '$lib/data';

	let textArea: HTMLTextAreaElement;
	let input: string = '';
	let output: string = '';

	// TOOD:
	input = `붉은기 추켜들고 진격해간다
	["석남", "Sŏngnam"],
    ["왕십리", "Wangsimni"],
    ["굽는다", "kumnŭnda"],
    ["선로", "sŏllo"],
    ["인덕원", "Indŏgwŏn"],
    ["교구동", "Kyogu-dong"],
    ["고비리", "Kobi-ri"],
    ["금교", "Kŭmgyo"],
    ["초도", "Chodo"],
    ["강동", "Kangdong"],
    ["칠보산", "Chilbosan"],
    ["곡산", "Koksan"],
    ["갑산", "Kapsan"],
    ["앞산", "Apsan"],
    ["삿갓봉", "Satkatbong"],
    ["울산", "Ulsan"],
    ["은률", "Ŭnryul"],
    ["닭섬", "Taksŏm"],
    ["물곬", "Mulkol"],
    ["붉은바위", "Pulgŭnbawi"],
    ["앉은바위", "Anjŭnbawi"],
    ["백마산", "Paengmasan"],
    ["꽃마을", "Kkonmaŭl"],
    ["압록강", "Amrokgang"],
    ["천리마", "Chŏllima"],
    ["한나산", "Hallasan"],
    ["전라도", "Jŏlla-do"],
    ["기대산", "Kittaesan"],
    ["새별읍", "Saeppyŏl-ŭp"],
    ["뒤문", "Twinmun"],
    ["앞언덕", "Ap-ŏndŏk"],
    ["부엌안골", "Puŏk-angol"],
    ["판교", "Phan-gyo"],
    ["방어동", "Pang-ŏ-dong"],
    ["평안남도 평성시", "Phyŏngannam-do Phyŏngsŏng-si"]
	`;

	const PUNCTUATIONS: Record<string, string> = {
		'.': '。',
		',': '，',
		':': '：',
		'“': '「',
		'”': '」'
	};

	/* TODO: sitelen toki pona -> sitelen munjan */
	function convertTokiPona2MunJan(tokiPona: string, dictionary: Record<string, string>): string {
		const words = tokiPona
			.split(/([\W])/)
			.filter((word) => word !== ' ')
			.map((word) => (word in PUNCTUATIONS ? PUNCTUATIONS[word] : word));
		return words.map((word) => (dictionary[word] ? dictionary[word] : word)).join('');
	}

	$: if (input) {
		output = convertHangulToDPRK(input);
	}

	// $: if ($dictionary && input) {
	// 	output = convertTokiPona2MunJan(smartquotes(input), $dictionary);
	// }

	// let suggestionBox: HTMLDivElement;

	// let suggestions: string[] = ['a', 'b', 'c'];

	// // function getLastChar()

	// function compileSuggestions(
	// 	input: string,
	// 	caretPos: number,
	// 	dictionary: Record<string, string>
	// ): string[] {
	// 	// Get caret position
	// 	console.log('carretPos', caretPos);
	// 	console.log('inputLength', input.length);

	// 	// Get substring until caret position
	// 	const sub = input.slice(0, caretPos);
	// 	console.log('sub', sub);

	// 	// Get the last word
	// 	const lastWord = sub.split(/[\s\W]/).pop();

	// 	if (!lastWord) return [];
	// 	return Object.keys(dictionary).filter((word) => word.startsWith(lastWord));
	// }

	// $: if ($dictionary) {
	// 	suggestions = compileSuggestions(input, caretPos, $dictionary);
	// }

	// let textArea: HTMLTextAreaElement;

	// let caretRect: DOMRect | undefined = undefined;
	// let caretPos: number = 0;

	// const MODES = ['Hangul -> Linear Hangul', 'Hangul -> DPRK'];
</script>

<svelte:head>
	<title>Korean Script Converter</title>
</svelte:head>

<main>
	<h1>Korean Script Converter</h1>

	<div class="options">
		<select disabled>
			<option>DPRK</option>
		</select>
	</div>

	<div class="container">
		<textarea class="text-box input-box" bind:value={input} bind:this={textArea} />
		<div class="convert">
			<MdiTransferDown class="icon" />
		</div>
		<div class="text-box output-box">{output}</div>
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap');

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	h1 {
		text-align: center;
	}

	.options {
		display: grid;
		place-content: center;
	}

	.options select {
		padding: 0.5em 1em;
		border-radius: 10px;
		font-size: 1rem;
		font-family: inherit;
	}

	@font-face {
		font-family: 'Atkinson Hyperlegible';
		src: url('/fonts/AtkinsonHyperlegible-Regular.ttf') format('truetype');
		font-weight: normal;
		font-style: normal;
	}

	:root {
		font-family: 'Atkinson Hyperlegible', 'Nanum Gothic', sans-serif;
	}

	textarea {
		resize: none;
		font-size: inherit;
		font-family: inherit;
	}

	.container {
		width: 820px; /* 800px -> 820px to account for new 10px padding */
		max-width: 100%;
		margin: 0 auto;
		padding: 0 1em; /* adds a horizontal padding for smaller screens */
		box-sizing: border-box; /* prevents the horizontal padding from causing overflow */
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.convert {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;

		background: white;
		background: rgba(255, 255, 255, 0.9);

		color: rgba(0, 6, 94, 0.9);

		width: 3rem;
		height: 3rem;
		margin: -1.5rem auto;
		margin-bottom: -1rem;
		border: none;
		border-radius: 50%;

		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.75rem;
		position: relative;
		z-index: 3;

		box-shadow: 1px 2px 3px 3px rgba(0, 0%, 0%, 10%);
		-webkit-box-shadow: 1px 2px 3px 3px rgba(0, 0, 0, 0.1); /* Chrome, Safari, Firefox, IE, Opera, ... */
		-moz-box-shadow: 1px 2px 3px 3px rgba(0, 0, 0, 0.1); /* earlier versions of Firefox*/
	}

	.text-box {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;

		padding: 1.2em 1.7em;
		border-radius: 10px;
		border: none;
		width: 100%;
		box-sizing: border-box; /* fixes overflow issue on smaller screens; box-sizing does not inherit */
		min-height: calc((100vh - 25rem) / 2);

		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px); /* Safari */

		box-shadow: 2px 2px 1px 5px rgba(0, 0%, 0%, 1%);
		-webkit-box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.03); /* Chrome, Safari, Firefox, IE, Opera, ... */
		-moz-box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.03); /* earlier versions of Firefox*/
	}

	.input-box {
		background: white;
		background: rgba(255, 255, 255, 0.8);
		color: black;
		color: rgb(0, 6, 94); /* For browsers that don't support RGB percentages */
		color: rgb(0% 2.46% 36.8%);
	}

	.output-box {
		/* makes the output box look different from the input box to avoid user confusion */
		background: black;
		background: rgba(
			0,
			6,
			65,
			0.6
		); /* basically the text color for .input-box, but with some transparency, and with 
					            the blue component toned down a bit */
		color: #eee;
		white-space: break-spaces;
		word-break: break-all;
	}
</style>
