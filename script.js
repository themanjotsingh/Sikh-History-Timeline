/*
$.getJSON(
    "https://v2-api.sheety.co/bb638adb5782cdebd0f49d570abd2eb0/timeline/sheet2/",
    function (data) {
        //console.log(data)

        for (var i = 0; i < data.sheet2.length; i++) {
            var each = data.sheet2[i];
            info = each.name
            lines = each.name
            //console.log(lines)
            
            var ul = document.getElementById("chart-bars");

            var li = document.createElement('li');
            li.setAttribute("data-duration", each.years)
            li.setAttribute("data-color", each.colour)
            li.setAttribute("style", each.textcolour)
            li.setAttribute("class", "bars")

            li.appendChild(document.createTextNode(lines));
            ul.appendChild(li);
            console.log(li)

        }
    }
)



*/

function createChart(e) {
    const days = document.querySelectorAll(".chart-values li");
    const tasks = document.querySelectorAll(".chart-bars li");
    const daysArray = [...days];

    tasks.forEach(el => {
        const duration = el.dataset.duration.split("-");
        const startDay = duration[0];
        const endDay = duration[1];
        let left = 0,
            width = 0;

        if (startDay.endsWith("½")) {
            const filteredArray = daysArray.filter(day => day.textContent == startDay.slice(0, -1));
            left = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2;
        } else {
            const filteredArray = daysArray.filter(day => day.textContent == startDay);
            left = filteredArray[0].offsetLeft;
        }

        if (endDay.endsWith("½")) {
            const filteredArray = daysArray.filter(day => day.textContent == endDay.slice(0, -1));
            width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2 - left;
        } else {
            const filteredArray = daysArray.filter(day => day.textContent == endDay);
            width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth - left;
        }

        // apply css
        el.style.left = `${left}px`;
        el.style.width = `${width}px`;
        if (e.type == "load") {
            el.style.backgroundColor = el.dataset.color;
            el.style.opacity = 1;
        }
    });
}

window.addEventListener("load", createChart);
window.addEventListener("resize", createChart);

