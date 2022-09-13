const docFlexItems: NodeList = document.querySelectorAll(".flex-item");
const startButton: HTMLButtonElement = document.querySelector(".run-btn");
let isRunning: boolean = false;

class Round {
  elements: HTMLCollectionOf<HTMLElement>;
  start(): void {
    this.elements = document.getElementsByClassName(
      "flex-item"
    ) as HTMLCollectionOf<HTMLElement>;

    const toToggle: HTMLElement[] = [];

    for (let i = 0; i < this.elements.length; i++) {
      let element: HTMLElement = this.elements[i];
      const count = this.get_active_neighbors_count(element);

      if (element.classList.contains("alive-item")) {
        if (!(count === 2 || count === 3)) {
          toToggle.push(element);
        }
      } else {
        if (count === 3) {
          toToggle.push(element);
        }
      }
    }

    for (const element of toToggle) {
      element.classList.toggle("alive-item");
    }
  }

  get_active_neighbors_count(element: HTMLElement): number {
    let total = 0;
    const neighborIdxList: number[] = JSON.parse(
      element.dataset["neighbors"]
    )

    for (let idx of neighborIdxList) {
      let neighbor = this.elements[idx - 1];
      if (neighbor.classList.contains("alive-item")) {
        total += 1;
      }
    }
    return total;
  }
}

for (let i = 0; i < docFlexItems.length; i++) {
  let item = docFlexItems[i];
  item.addEventListener("click", (event: Event) => {
    if (isRunning) {
      return;
    }
    const target = event.target as HTMLElement;
    if (target !== null) {
      target.classList.toggle("alive-item");
    }
  });
}

const sleep = (time: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, time));

startButton?.addEventListener("click", async (event) => {
  isRunning = !isRunning;
  const button = event.target as HTMLButtonElement;

  if (isRunning) {
    start();
    button.innerText = "Stop";
  } else {
    button.innerText = "Start";
  }
});

const start = async () => {
  const round = new Round();
  while (isRunning) {
    round.start();
    await sleep(50);
  }
};
