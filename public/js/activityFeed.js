class ActivityFeed {

    constructor(containerId, maxItems = 5) {

        this.container = document.getElementById(containerId);

        this.maxItems = maxItems;

    }

    add(data) {

        const card = this.createCard(data);

        this.container.prepend(card);

        requestAnimationFrame(() => {

            card.classList.add("show");

        });

        setTimeout(() => {

            card.classList.remove("new");

        }, 2000);

        while (this.container.children.length > this.maxItems) {

            this.container.lastChild.remove();

        }

    }

    createCard(data) {

        const div = document.createElement("div");

        div.className = `activity-item new ${this.getClass(data.type)}`;

        div.innerHTML = `

            <div class="activity-header">

                <span class="activity-type">

                    ${this.getLabel(data.type)}

                </span>

                <span class="activity-time">

                    ${data.time}

                </span>

            </div>

            <div class="activity-message">

                ${data.message}

            </div>

            ${
                data.counter
                ? `<div class="activity-counter">${data.counter}</div>`
                : ""
            }

        `;

        return div;

    }

    getLabel(type){

        switch(type){

            case "ticket": return "🎫 TICKET";

            case "calling": return "📢 CALLING";

            case "recall": return "🔄 RECALL";

            case "finish": return "✅ FINISH";

            case "skip": return "⏭ SKIP";

            case "online": return "🟢 ONLINE";

            case "offline": return "🔴 OFFLINE";

            default: return "📡 EVENT";

        }

    }

    getClass(type){

        return "activity-" + type;

    }

}