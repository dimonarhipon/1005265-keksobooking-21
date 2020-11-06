(()=>{"use strict";(()=>{const e=document.querySelector("#success").content.querySelector(".success"),t=document.querySelector("#error").content.querySelector(".error"),o=t.querySelector(".error__button");window.util={getRandomNumber:(e,t=0)=>Math.floor(Math.random()*(e-t)+t),errorHandler:e=>{const t=document.createElement("div");t.style="z-index: 5; margin: 0 auto; text-align: center; background-color: tomato;",t.style.position="absolute",t.style.width="400px",t.style.height="80px",t.style.color="#ffffff",t.style.left=0,t.style.right=0,t.style.fontSize="28px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},openSuccessPopup:()=>{const t=e.cloneNode(!0);document.body.insertAdjacentElement("afterbegin",t),document.addEventListener("click",(()=>{t.style.display="none"})),document.addEventListener("keydown",(e=>{"Escape"===e.key&&(e.preventDefault(),t.style.display="none")}))},openErrorPopup:()=>{const e=t.cloneNode(!0);document.body.insertAdjacentElement("afterbegin",e),document.addEventListener("click",(()=>{e.style.display="none"})),document.addEventListener("keydown",(t=>{"Escape"===t.key&&(t.preventDefault(),e.style.display="none")})),o.addEventListener("click",(()=>{e.style.display="none"}))},debounce:e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}}}})(),(()=>{window.backend={load:(t,o)=>{const n=e(t,o);n.open("GET","https://21.javascript.pages.academy/keksobooking/data"),n.send()},post:(t,o,n)=>{const r=e(o,n);r.open("POST","https://21.javascript.pages.academy/keksobooking"),r.send(t)}};const e=(e,t)=>{const o=new XMLHttpRequest;return o.responseType="json",o.addEventListener("load",(function(){400===o.status?t(`Неверный запрос: ${o.status} ${o.statusText}`):404===o.status?t(`Не найдено: ${o.status} ${o.statusText}`):500===o.status?t(`Ошибка сервера: ${o.status} ${o.statusText}`):200!==o.status?t(`Статус ответа: ${o.status} ${o.statusText}`):e(o.response)})),o.addEventListener("error",(function(){t("Произошла ошибка соединения")})),o.addEventListener("timeout",(function(){t(`Запрос не успел выполниться за ${o.timeout} мс`)})),o.timeout=7e3,o}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin");window.advert={render:t=>{const o=e.cloneNode(!0),n=o.querySelector("img");return o.style=`left: ${t.location.x}px; top: ${t.location.y}px`,n.src=t.author.avatar,n.alt=t.offer.title,o.classList.add("hidden"),o}}})(),(()=>{const e={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"},t=document.querySelector("#card").content.querySelector(".map__card");window.card={render:o=>{const n=t.cloneNode(!0),r=n.querySelector(".popup__title"),a=n.querySelector(".popup__text--address"),s=n.querySelector(".popup__text--price"),i=n.querySelector(".popup__type"),d=n.querySelector(".popup__text--capacity"),l=n.querySelector(".popup__text--time "),c=n.querySelector(".popup__features"),u=n.querySelector(".popup__description"),p=n.querySelector(".popup__photos"),m=n.querySelector(".popup__avatar");return m.src=o.author.avatar,m.alt=o.offer.title,r.textContent=o.offer.title,a.textContent=o.offer.address,s.textContent=o.offer.price+" ₽/ночь.",i.textContent=e[o.offer.type],d.textContent=`${o.offer.rooms} комнаты для ${o.offer.guests} гостей`,l.textContent=`Заезд после ${o.offer.checkin}, выезд до ${o.offer.checkout}`,(e=>{c.innerHTML="";const t=document.createDocumentFragment();for(let o=0;o<e.offer.features.length;o++){const n=document.createElement("li");n.className="popup__feature popup__feature--"+e.offer.features[o],t.appendChild(n)}c.appendChild(t)})(o),u.textContent=o.offer.description,(e=>{p.innerHTML="";const t=document.createDocumentFragment();for(let o=0;o<e.offer.photos.length;o++){const n=document.createElement("img");n.src=e.offer.photos[o],n.width=40,n.height=40,t.appendChild(n)}p.appendChild(t)})(o),n.classList.add("hidden"),n}}})(),(()=>{const e=document.querySelector(".map");window.map={workSpace:e,disablePage:(t=!0,o=!1)=>{e.classList.add("map--faded"),window.form.container.classList.add("ad-form--disabled"),window.form.fieldsets.map((e=>e.disabled=t)),window.mapFilter.fieldsets.map((e=>e.disabled=t)),window.mapFilter.selects.map((e=>e.disabled=t)),(e=>{e&&window.backend.load(window.pin.successHandler,window.util.errorHandler)})(o),t||(e.classList.remove("map--faded"),window.form.container.classList.remove("ad-form--disabled"))}}})(),(()=>{const e={ANY:{min:0,max:1/0},LOW:{min:0,max:1e4},MIDDLE:{min:1e4,max:5e4},HIGH:{min:5e4,max:1/0}},t=window.map.workSpace.querySelector(".map__filters"),o=t.querySelector("#housing-type"),n=t.querySelector("#housing-price"),r=t.querySelector("#housing-rooms"),a=t.querySelector("#housing-guests"),s=t.querySelector("#housing-features"),i=(e,t,o)=>"any"===e.value||e.value===t[o].toString(),d=window.util.debounce((t=>{const d=t;window.pin.removeElements();const l=[];for(let t=0;t<d.length;t++){let c=d[t];const u=e[n.value.toUpperCase()],p=Array.from(s.querySelectorAll("input:checked")),m=i(o,c.offer,"type"),f=!u||c.offer.price>=u.min&&c.offer.price<=u.max,y=i(r,c.offer,"rooms"),w=i(a,c.offer,"guests"),v=p.every((e=>c.offer.features.includes(e.value)));if(m&&f&&y&&w&&v&&l.push(c),l.length>=5)break}window.pin.renderElements(l),window.pin.open()}));window.mapFilter={form:t,fieldsets:Array.from(t.querySelectorAll("fieldset")),selects:Array.from(t.querySelectorAll("select")),activate:e=>{t.addEventListener("change",(()=>{d(e)}))}}})(),(()=>{const e={BUNGALOW:0,FLAT:1e3,HOUSE:5e3,PALACE:1e4},t=document.querySelector(".ad-form"),o=t.querySelector("#room_number"),n=t.querySelector("#capacity"),r=t.querySelector("#address"),a=t.querySelector(".ad-form__reset"),s=t.querySelector("#title"),i=t.querySelector("#type"),d=t.querySelector("#price"),l=t.querySelector("#timein"),c=t.querySelector("#timeout"),u=()=>{const e=s.value.length;s.validity.tooShort?s.setCustomValidity("Нужно больше 30 символов. Сейчас: "+e):s.validity.tooLong?s.setCustomValidity("Нужно меньше 100 символов. Сейчас: "+e):s.validity.valueMissing?s.setCustomValidity("Нужно написать заголовок"):s.setCustomValidity("")},p=()=>{const t=e[i.value.toUpperCase()];d.min=t,d.placeholder=t.toString()},m=()=>{d.validity.valueMissing?d.setCustomValidity("Нужно установить цену"):d.validity.typeMismatch?d.setCustomValidity("Вводите число"):d.validity.rangeUnderFlow?d.setCustomValidity("Слишком мало, надо больше"):d.validity.rangeOverflow?d.setCustomValidity("Слишком много, надо меньше 1000001"):d.setCustomValidity("")},f=()=>{const e=parseInt(o.value,10),t=parseInt(n.value,10);100===e&&0!==t||100!==e&&0===t?n.setCustomValidity("Такой выбор соотвествует только варианту: не для гостей"):e<t?n.setCustomValidity("Гостей должно быть меньше, чем комнат"):(n.setCustomValidity(""),o.reportValidity(),n.reportValidity())},y=e=>{c.value=e.target.value},w=e=>{l.value=e.target.value},v=()=>{window.util.openSuccessPopup(),window.pin.removeElements(),window.mapFilter.form.reset(),t.reset(),window.map.disablePage(),window.isLoad=!0},h=e=>{e.preventDefault(),t.reset()},L=e=>{e.preventDefault(),window.backend.post(new FormData(t),v,window.util.openErrorPopup),s.removeEventListener("input",u),i.removeEventListener("change",p),d.removeEventListener("invalid",m),o.removeEventListener("change",f),n.removeEventListener("change",f),l.removeEventListener("change",y),c.removeEventListener("change",w),a.removeEventListener("reset",h),t.removeEventListener("submit",L)};s.addEventListener("input",u),i.addEventListener("change",p),d.addEventListener("invalid",m),o.addEventListener("change",f),n.addEventListener("change",f),l.addEventListener("change",y),c.addEventListener("change",w),a.addEventListener("reset",h),t.addEventListener("submit",L),f(),p(),window.form={container:t,address:r,fieldsets:Array.from(t.querySelectorAll("fieldset"))}})(),(()=>{const e=document.createDocumentFragment(),t=document.createDocumentFragment(),o=window.map.workSpace.querySelector(".map__pins"),n=window.map.workSpace.querySelector(".map__pin--main"),r=Math.floor(n.offsetWidth/2),a=Math.floor(n.offsetHeight/2),s=n.offsetLeft+r,i=n.offsetTop+a,d=(e=s,t=i)=>{e=parseInt(e,10),t=parseInt(t,10),window.form.address.value=`${e}, ${t}`},l=o=>{const n=o.length>5?5:o.length;for(let r=0;r<n;r++)e.appendChild(window.advert.render(o[r])),t.appendChild(window.card.render(o[r]));window.pin.container.appendChild(e),window.pin.container.appendChild(t),u()},c=e=>{const t=Array.from(window.map.workSpace.querySelectorAll(".popup")),o=t[e].querySelector(".popup__close");t.forEach((e=>e.classList.add("hidden"))),t[e].classList.remove("hidden"),document.addEventListener("keydown",(o=>{"Escape"===o.key&&(o.preventDefault(),t[e].classList.add("hidden"))})),o.addEventListener("click",(()=>t[e].classList.add("hidden")))},u=()=>{const e=Array.from(o.querySelectorAll(".map__pin:not(.map__pin--main)"));for(let t=0;t<e.length;t++)e[t].addEventListener("click",(()=>{c(t)}))},p=()=>{o.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>e.classList.remove("hidden")))};window.isLoad=!0,n.addEventListener("mousedown",(e=>{if(e.preventDefault(),0===e.button){window.map.disablePage(!1,window.isLoad),window.isLoad&&(window.isLoad=!1),d(s,i+a);let t=!1,o={x:e.clientX,y:e.clientY},l=i,c=s;const u=e=>{e.preventDefault(),t=!0;const s=o.x-e.clientX,i=o.y-e.clientY;o={x:e.clientX,y:e.clientY},n.style.zIndex=2,l=n.offsetTop-i,c=n.offsetLeft-s,l<170?l=170:l>620&&(l=620),c<-32?c=-32:c>1168&&(c=1168),n.style.top=l+"px",n.style.left=c+"px",d(c+r,l+2*a)},p=e=>{if(e.preventDefault(),d(c+r,l+2*a),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",p),t){const e=t=>{t.preventDefault(),n.removeEventListener("click",e)};n.addEventListener("click",e)}};document.addEventListener("mousemove",u),document.addEventListener("mouseup",p)}})),n.addEventListener("keydown",(e=>{"Enter"===e.key&&(window.map.disablePage(!1,window.pin.isLoad),p(),d(s,i+a))})),n.focus(),d(),window.pin={container:o,successHandler:e=>{window.mapFilter.activate(e),l(e),p()},removeElements:()=>{const e=o.querySelectorAll(".map__pin:not(.map__pin--main)"),t=window.map.workSpace.querySelectorAll(".map__card");e.forEach((e=>e.remove())),t.forEach((e=>e.remove()))},renderElements:l,open:p}})(),window.map.disablePage()})();