import "./css/index.css";
import axios from "axios";

/* DOM VARIABLES */
const loader_1: HTMLDivElement = document.querySelector(".loader-1");
const loader_2: NodeListOf<HTMLDivElement> = document.querySelectorAll(".loader-2");
const container: HTMLElement = document.querySelector(".container");
const boxElms: NodeListOf<HTMLDivElement> = document.querySelectorAll(".box");
const btnMore: HTMLButtonElement = document.querySelector(".btn");

/* LOGICAL VARIABLES */
const API = "https://harry-potter-api-en.onrender.com/db";

window.addEventListener("DOMContentLoaded", async () => {
	container.style.display = "none";

	setTimeout(async () => {
		loader_1.classList.add("hidden");
		loader_1.style.display = "none";
		container.style.display = "grid";

		await searchImg();
	}, 3000);

	async function searchImg() {
		try {
			const getInfoFromApi = await axios.get(API);
			const characters = getInfoFromApi.data.characters;

			boxElms.forEach((item, idx) => {
				const person = characters[Math.floor(Math.random() * 100)];
				const personImg = person.image;
				const img = document.createElement("img");
				img.src = personImg;
				item.append(img);
				loader_2[idx].style.display = "none";
			});
		} catch (error) {
			loader_2.forEach((loaderItem) => {
				loaderItem.style.display = "flex";
			});
			console.error(error);
		}
	}
});
