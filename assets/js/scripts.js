document.addEventListener("DOMContentLoaded", () => {
    const fxLayer = document.getElementById("fx-layer");
    const fireworkBtn = document.getElementById("triggerFireworkBtn");

    const MAX_SNOWBALLS = 30;

    function createSnowball() {
        if (document.querySelectorAll(".snowball").length > MAX_SNOWBALLS) return;

        const snowball = document.createElement("div");
        snowball.classList.add("snowball");

        const startX = Math.random() * 100;
        const duration = 5 + Math.random() * 5;
        const size = 16 + Math.random() * 24;

        snowball.style.left = `${startX}vw`;
        snowball.style.width = `${size}px`;
        snowball.style.height = `${size}px`;
        snowball.style.animation = `fall ${duration}s linear infinite`;

        fxLayer.appendChild(snowball);

        setTimeout(() => {
            if (snowball.parentNode) snowball.remove();
        }, duration * 1000);
    }

    setInterval(createSnowball, 800);

    function launchFirework(amount = 1) {
        const count = Math.max(1, Math.floor(amount));

        for (let i = 0; i < count; i++) {
            const rocket = document.createElement('div');
            rocket.classList.add('rocket');

            const launchX = 20 + Math.random() * 60;
            rocket.style.left = `${launchX}vw`;
            rocket.style.bottom = '-50px';

            const randomHeight = Math.floor(Math.random() * (35 - 7 + 1)) + 7;
            rocket.style.setProperty('--launch-height', randomHeight);

            const duration = randomHeight * 0.05;
            rocket.style.animation = `launch ${duration}s ease-out forwards`;

            fxLayer.appendChild(rocket);

            setTimeout(() => {
            const rect = rocket.getBoundingClientRect();
            createExplosion(rect.left + rect.width / 2, rect.top);
            rocket.remove();
            }, 1500);
        }
    }

    function createExplosion(x, y) {
        const particleCount = 20;
        const colors = ["#ff0000", "#39c94e", "#ffff00", "#00ffff", "#ff00ff"];

        for (let i = 0; i < particleCount; i++) {
            const spark = document.createElement("div");
            spark.classList.add("spark");
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;
            spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            spark.style.setProperty("--tx", `${tx}px`);
            spark.style.setProperty("--ty", `${ty}px`);

            spark.style.animation = "spark 0.8s ease-out forwards";

            fxLayer.appendChild(spark);

            setTimeout(() => spark.remove(), 800);
        }
    }

    if (fireworkBtn) {
        fireworkBtn.addEventListener("click", (e) => {
            e.target.style.transform = "scale(0.95)";
            setTimeout(() => (e.target.style.transform = ""), 100);
            launchFirework(Math.round(Math.random() * 2.5));
            //launchFirework(20);
        });
    }
});