<script lang="ts">
	import { convertHangulToDPRK, convertHangulToMC2000, convertHangulToYale } from 'koconv';
	import MdiTransferDown from '~icons/mdi/transfer-down';
	// import smartquotes from 'smartquotes';
	import { tick } from 'svelte';
	// import Suggestions from './Suggestions.svelte';

	// import { dictionary } from '$lib/data';

	let textArea: HTMLTextAreaElement;
	let input: string = '';
	let output: string = '';

	let mode = 'Hangul -> DPRK';
	$: convert =
		{
			'Hangul -> DPRK': convertHangulToDPRK,
			'Hangul -> MC2000': convertHangulToMC2000,
			'Hangul -> Yale': convertHangulToYale
		}[mode] ?? convertHangulToDPRK;

	// TOOD:
	input = `\
붉은기 추켜들고 진격해간다
총대를 앞세우고 돌격해간다
일심의 천만대오 이끌고가는
그 모습은 선군기치다

공격 공격 공격앞으로
장군님의 혁명방식은
백두산 번개처럼 공격
정일봉 우뢰처럼 공격
	`;

	// const PUNCTUATIONS: Record<string, string> = {
	// 	'.': '。',
	// 	',': '，',
	// 	':': '：',
	// 	'“': '「',
	// 	'”': '」'
	// };

	$: if (input) {
		output = convert(input);
	}
</script>

<svelte:head>
	<title>Korean Script Converter</title>
</svelte:head>

<main>
	<h1>Korean Script Converter</h1>

	<div class="options">
		<select bind:value={mode}>
			<option value="Hangul -> DPRK">Hangul → DPRK</option>
			<option value="Hangul -> Yale">Hangul → Yale</option>
			<option value="Hangul -> MC2000">Hangul → MC2000</option>
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
