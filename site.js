/* ===== Business info: edit here ===== */
const CONFIG = {
  phone: "+1 (754) 272-5100",   // shown on the site
  phoneDigits: "17542725100",   // country code + number, digits only (texts & WhatsApp)
  email: "contact@glassmastercleaning.com", // leave empty to hide the email options
  instagram: "glassmastercleaning",
  reviews: "https://share.google/psCZiamiwQSyMjKF9", // Google Business Profile (GLASSMASTER GPM CORP); leave empty to hide the button
  area: "Serving Broward, Palm Beach and Miami-Dade counties"
};

/* Photos: put files in img/ with these names (.jpg). Missing photos show a blue placeholder. */
const FOTOS = {
  hero: "img/hero.jpg",
  heroMobile: "img/hero-mobile.jpg",   // vertical photo used on phones
  residential: "img/residential.jpg",
  commercial: "img/commercial.jpg",
  hardwater: "img/hard-water.jpg",
  power: "img/pressure-washing-before-after.jpg",
  solar: "img/solar.jpg",
  logo: "img/logo.png",
  /* gallery, in display order (11-13: the client's Instagram picks (11, 13 from the WhatsApp originals); 14-24: Site-2 folder; 25-33: WhatsApp photos. Photos showing dirt go to Before & after, not here. Keep the count at 23, 26, 30 or 33 so the grid has no gaps) */
  work: [11,25,26,27,13,30,31,28,33,12,14,15,16,18,19,20,21,22,23,24,29,1,2,3,4,5,6,7,8,9].map(n=>`img/work-${n}.jpg`)
};

/* Which part of a photo stays visible when it is cropped */
const FOCUS = { solar: "30% 75%" };

const STORIES = ["1 story","2 stories","3+ stories"];
const SIDES = ["Exterior only","Interior only","Interior & exterior"];

const SERVICES_EN = [
  { id:"residential", photo:"residential", name:"Residential Window Cleaning",
    what:"We clean residential windows and glass surfaces to remove everyday dust, fingerprints, pollen, and common surface buildup. Service can be customized for the home's needs and may include interior and exterior glass, where requested.",
    benefits:["A brighter, clearer view and more natural light coming through clean glass.","A well-maintained appearance that helps your home look cared for from both inside and outside.","Routine cleaning helps prevent dirt and mineral residue from building up over time. It is maintenance, not just a one-time cosmetic service.","Regular service can help identify stubborn spots or buildup early, before they become more difficult to address."],
    note:"Ideal for homeowners who want to keep their windows consistently clean throughout the year.",
    questions:[
      {id:"stories", q:"How many stories is the home?", opts:STORIES},
      {id:"panes", q:"About how many glass panes does the home have?", opts:["1–10","11–20","21–35","36–50","50+","Not sure"]},
      {id:"side", q:"Which service would you like?", opts:SIDES},
      {id:"screens", q:"Include screen cleaning?", opts:["Yes","No"]},
      {id:"tracks", q:"Include window tracks and sills?", opts:["Yes","No"]}
    ]},
  { id:"commercial", photo:"commercial", name:"Commercial Window Cleaning",
    what:"We clean glass at commercial properties such as offices, retail stores, gyms, restaurants, and shared building areas. Cleaning plans can be arranged around the property's traffic, appearance standards, and maintenance schedule.",
    benefits:["Creates a strong first impression for customers, clients, tenants, and visitors.","Helps storefronts, entrances, lobbies, and other customer-facing areas look professional and inviting.","Supports the presentation of your business and the overall experience people have when they visit.","Scheduled maintenance keeps glass from looking neglected and helps businesses maintain a consistent standard."],
    note:"Recurring service is a practical option for businesses that need their property to look professional week after week.",
    questions:[
      {id:"type", q:"What type of property is it?", opts:["Commercial building","Shopping center","Gym","Hotel","Restaurant","Other"]},
      {id:"stories", q:"How many stories is the building?", opts:["1 story","2 stories","3–5 stories","6+ stories"]},
      {id:"panes", q:"About how many glass panes does the property have?", opts:["1–25","26–50","51–100","100+","Not sure"]},
      {id:"side", q:"Which service would you like?", opts:SIDES},
      {id:"freq", q:"How often would you like service?", opts:["One time","Monthly","Every 3 months","Every 6 months","Other"]},
      {id:"access", q:"How easy is it to reach the glass?", opts:["Easy access","Special equipment needed","Not sure"]}
    ]},
  { id:"power", photo:"power", name:"Pressure Washing",
    what:"Pressure washing removes dirt, grime, algae, and other buildup from suitable exterior hard surfaces. Depending on the property and surface, service may include driveways, walkways, patios, and other outdoor areas. We select the cleaning approach based on the surface material and its condition.",
    benefits:["Improves curb appeal by making exterior areas look cleaner and better maintained.","Removes common surface buildup that can make walkways and other areas look dirty or neglected.","Helps maintain a cleaner environment around entrances and outdoor living areas.","Routine exterior cleaning can help keep buildup from accumulating heavily between services."],
    note:"The right method and pressure depend on the surface. Some materials require a gentler soft-wash approach rather than high pressure.",
    questions:[
      {id:"areas", q:"Which areas would you like washed?", hint:"Select all that apply", multi:true, opts:["Pool deck","Driveway","Sidewalks & walkways","Patio","House exterior","Roof","Fence","Other"]},
      {id:"stories", q:"How many stories is the home?", opts:STORIES},
      {id:"size", q:"About how big is the area?", opts:["Small","Medium","Large","Not sure"]},
      {id:"heavy", q:"Any areas with heavy dirt, mold, algae, or stains?", opts:["Yes","No","Not sure"]},
      {id:"details", q:"Anything else we should know?", hint:"Optional", text:true, optional:true}
    ]},
  { id:"hardwater", photo:"hardwater", name:"Hard Water Stain Removal",
    what:"We provide specialized treatment for mineral deposits and hard-water staining on glass. These marks can form when water droplets dry on the surface and leave behind mineral residue. We assess the glass first and select an appropriate method based on the severity of the staining and the condition of the window.",
    benefits:["Helps improve the clarity and appearance of glass affected by chalky spots, cloudy marks, or mineral buildup.","Can restore a cleaner, more uniform look to windows that ordinary cleaning may not fully improve.","Addresses a specific glass issue rather than simply cleaning everyday dirt and fingerprints.","Early assessment may help prevent deposits from becoming more difficult to remove over time."],
    note:"Mineral stain removal is a specialized service and may require a separate estimate. Results depend on the severity of the deposits and whether the glass has been permanently etched or damaged. Permanent etching cannot always be removed.",
    questions:[
      {id:"where", q:"Where are the mineral stains?", hint:"Select all that apply", multi:true, opts:["Windows","Shower glass","Other glass surfaces"]},
      {id:"amount", q:"About how many panes need treatment?", opts:["1–5","6–15","16+","Not sure"]},
      {id:"severity", q:"How strong are the stains?", opts:["Small white spots","Cloudy / hazy glass","Heavy mineral buildup"]},
      {id:"photos", q:"Can you send photos of the affected glass?", opts:["Yes, I'll attach them or share a link","Not right now"]}
    ]},
  { id:"solar", photo:"solar", name:"Solar Panel Cleaning",
    what:"We clean solar panel surfaces to remove dust, pollen, and other debris that can collect over time. Cleaning is performed with care for the panel surface and in accordance with appropriate manufacturer guidance.",
    benefits:["Helps panels receive sunlight without a layer of ordinary dirt and debris in the way.","Can help reduce soiling-related losses in solar production; the actual effect depends on the amount and type of buildup and local conditions.","Supports routine care of the solar array and helps keep the panels looking clean.","A scheduled cleaning plan helps manage dust and debris before it accumulates heavily."],
    note:"Cleaning frequency depends on the property's environment, visible buildup, and the solar system manufacturer's recommendations. Cleaning does not guarantee a specific increase in energy production.",
    questions:[
      {id:"stories", q:"How many stories is the home?", opts:STORIES},
      {id:"panels", q:"About how many solar panels are there?", opts:["1–10","11–20","21–30","31–40","40+","Not sure"]}
    ]}
];

const CONTACT_Q_EN = [
  {id:"name", q:"Full name", type:"text", auto:"name", req:true},
  {id:"phone", q:"Phone number", type:"tel", auto:"tel", req:true},
  {id:"email", q:"Email address", type:"email", auto:"email", req:true},
  {id:"address", q:"Service address", hint:"Street and number", type:"text", auto:"street-address", req:true},
  {id:"zip", q:"ZIP code", type:"text", auto:"postal-code", req:true},
  {id:"ptype", q:"Is the property residential or commercial?", opts:["Residential","Commercial"]}
];

/* ===== Spanish version (same ids and order as the English lists above) ===== */
const PISOS = ["1 piso","2 pisos","3 pisos o más"];
const LADOS = ["Solo exterior","Solo interior","Interior y exterior"];
const NS = "No estoy seguro";
const SERVICES_ES = [
  { id:"residential", photo:"residential", name:"Limpieza de ventanas residenciales",
    what:"Limpiamos ventanas y superficies de vidrio de casas para quitar el polvo del día a día, huellas, polen y suciedad común. El servicio se adapta a cada casa y puede incluir el vidrio interior y exterior, si lo desea.",
    benefits:["Una vista más clara y más luz natural entrando por vidrios limpios.","Una apariencia bien cuidada que hace que su casa luzca atendida por dentro y por fuera.","La limpieza regular ayuda a evitar que la suciedad y los residuos minerales se acumulen con el tiempo. Es mantenimiento, no solo un servicio estético de una vez.","El servicio regular ayuda a detectar a tiempo manchas difíciles o acumulación, antes de que sean más difíciles de tratar."],
    note:"Ideal para quienes quieren mantener sus ventanas limpias todo el año.",
    questions:[
      {id:"stories", q:"¿Cuántos pisos tiene la casa?", opts:PISOS},
      {id:"panes", q:"¿Cuántos paneles de vidrio tiene la casa, más o menos?", opts:["1–10","11–20","21–35","36–50","50+",NS]},
      {id:"side", q:"¿Qué servicio desea?", opts:LADOS},
      {id:"screens", q:"¿Incluir limpieza de mallas (screens)?", opts:["Sí","No"]},
      {id:"tracks", q:"¿Incluir rieles y marcos de las ventanas?", opts:["Sí","No"]}
    ]},
  { id:"commercial", photo:"commercial", name:"Limpieza de ventanas comerciales",
    what:"Limpiamos vidrios en propiedades comerciales como oficinas, tiendas, gimnasios, restaurantes y áreas comunes de edificios. Los planes de limpieza se pueden organizar según el tráfico de la propiedad, sus estándares de presentación y su calendario de mantenimiento.",
    benefits:["Causa una gran primera impresión en clientes, inquilinos y visitantes.","Ayuda a que vitrinas, entradas, recepciones y otras áreas de atención al público se vean profesionales y acogedoras.","Apoya la imagen de su negocio y la experiencia de quienes lo visitan.","El mantenimiento programado evita que los vidrios se vean descuidados y ayuda a mantener un estándar constante."],
    note:"El servicio recurrente es una opción práctica para negocios que necesitan que su propiedad luzca profesional semana tras semana.",
    questions:[
      {id:"type", q:"¿Qué tipo de propiedad es?", opts:["Edificio comercial","Centro comercial","Gimnasio","Hotel","Restaurante","Otro"]},
      {id:"stories", q:"¿Cuántos pisos tiene el edificio?", opts:["1 piso","2 pisos","3–5 pisos","6 pisos o más"]},
      {id:"panes", q:"¿Cuántos paneles de vidrio tiene la propiedad, más o menos?", opts:["1–25","26–50","51–100","100+",NS]},
      {id:"side", q:"¿Qué servicio desea?", opts:LADOS},
      {id:"freq", q:"¿Con qué frecuencia desea el servicio?", opts:["Una sola vez","Mensual","Cada 3 meses","Cada 6 meses","Otra"]},
      {id:"access", q:"¿Qué tan fácil es llegar a los vidrios?", opts:["Acceso fácil","Se necesita equipo especial",NS]}
    ]},
  { id:"power", photo:"power", name:"Lavado a presión",
    what:"El lavado a presión quita suciedad, mugre, algas y otras acumulaciones de las superficies exteriores duras que lo permiten. Según la propiedad y la superficie, el servicio puede incluir entradas de autos, caminos, patios y otras áreas exteriores. Elegimos el método de limpieza según el material de la superficie y su estado.",
    benefits:["Mejora la apariencia exterior, que se ve más limpia y mejor cuidada.","Quita la acumulación común que hace que caminos y otras áreas se vean sucios o descuidados.","Ayuda a mantener más limpias las entradas y las áreas exteriores de la casa.","La limpieza exterior regular ayuda a que la suciedad no se acumule demasiado entre un servicio y otro."],
    note:"El método y la presión adecuados dependen de la superficie. Algunos materiales necesitan un lavado suave (soft wash) en lugar de alta presión.",
    questions:[
      {id:"areas", q:"¿Qué áreas desea lavar?", hint:"Seleccione todas las que apliquen", multi:true, opts:["Área de la piscina","Entrada de autos","Aceras y caminos","Patio","Exterior de la casa","Techo","Cerca","Otra"]},
      {id:"stories", q:"¿Cuántos pisos tiene la casa?", opts:PISOS},
      {id:"size", q:"¿Qué tan grande es el área, más o menos?", opts:["Pequeña","Mediana","Grande",NS]},
      {id:"heavy", q:"¿Hay áreas con mucha suciedad, moho, algas o manchas?", opts:["Sí","No",NS]},
      {id:"details", q:"¿Algo más que debamos saber?", hint:"Opcional", text:true, optional:true}
    ]},
  { id:"hardwater", photo:"hardwater", name:"Eliminación de manchas de agua dura",
    what:"Ofrecemos un tratamiento especializado para depósitos minerales y manchas de agua dura en el vidrio. Estas marcas se forman cuando las gotas de agua se secan sobre la superficie y dejan residuos minerales. Primero evaluamos el vidrio y elegimos el método adecuado según la intensidad de las manchas y el estado de la ventana.",
    benefits:["Ayuda a mejorar la claridad y la apariencia del vidrio con puntos blancos, marcas opacas o acumulación mineral.","Puede devolver un aspecto más limpio y parejo a ventanas que la limpieza común no logra mejorar del todo.","Trata un problema específico del vidrio, no solo la suciedad y las huellas del día a día.","Una evaluación temprana puede ayudar a que los depósitos no se vuelvan más difíciles de quitar con el tiempo."],
    note:"La eliminación de manchas minerales es un servicio especializado y puede requerir un presupuesto aparte. Los resultados dependen de la intensidad de los depósitos y de si el vidrio está grabado o dañado de forma permanente. El grabado permanente no siempre se puede eliminar.",
    questions:[
      {id:"where", q:"¿Dónde están las manchas minerales?", hint:"Seleccione todas las que apliquen", multi:true, opts:["Ventanas","Vidrio de la ducha","Otras superficies de vidrio"]},
      {id:"amount", q:"¿Cuántos paneles necesitan tratamiento, más o menos?", opts:["1–5","6–15","16+",NS]},
      {id:"severity", q:"¿Qué tan fuertes son las manchas?", opts:["Pequeños puntos blancos","Vidrio opaco o empañado","Mucha acumulación mineral"]},
      {id:"photos", q:"¿Puede enviarnos fotos del vidrio afectado?", opts:["Sí, las adjunto o comparto un enlace","Ahora no"]}
    ]},
  { id:"solar", photo:"solar", name:"Limpieza de paneles solares",
    what:"Limpiamos la superficie de los paneles solares para quitar polvo, polen y otros residuos que se acumulan con el tiempo. La limpieza se hace con cuidado de la superficie del panel y siguiendo las recomendaciones del fabricante.",
    benefits:["Ayuda a que los paneles reciban la luz del sol sin una capa de suciedad y residuos en el medio.","Puede ayudar a reducir las pérdidas de producción causadas por la suciedad; el efecto real depende de la cantidad y el tipo de acumulación y de las condiciones locales.","Apoya el cuidado regular del sistema solar y ayuda a que los paneles se vean limpios.","Un plan de limpieza programado ayuda a controlar el polvo y los residuos antes de que se acumulen demasiado."],
    note:"La frecuencia de limpieza depende del entorno de la propiedad, la suciedad visible y las recomendaciones del fabricante del sistema solar. La limpieza no garantiza un aumento específico en la producción de energía.",
    questions:[
      {id:"stories", q:"¿Cuántos pisos tiene la casa?", opts:PISOS},
      {id:"panels", q:"¿Cuántos paneles solares hay, más o menos?", opts:["1–10","11–20","21–30","31–40","40+",NS]}
    ]}
];
const CONTACT_Q_ES = [
  {id:"name", q:"Nombre completo", type:"text", auto:"name", req:true},
  {id:"phone", q:"Número de teléfono", type:"tel", auto:"tel", req:true},
  {id:"email", q:"Correo electrónico", type:"email", auto:"email", req:true},
  {id:"address", q:"Dirección del servicio", hint:"Calle y número", type:"text", auto:"street-address", req:true},
  {id:"zip", q:"Código postal (ZIP)", type:"text", auto:"postal-code", req:true},
  {id:"ptype", q:"¿La propiedad es residencial o comercial?", opts:["Residencial","Comercial"]}
];

/* Interface texts. Keys in TEXT_ES match the data-i18n attributes in the HTML. */
const UI = {
  en: { title:document.title, area:CONFIG.area, pickLabel:"Choose your services", pickH:"What can we help you with?", pickSub:"Select one or more services.", selAll:"Select all services", clearSel:"Clear selection",
    contactLabel:"Your contact details", contactH:"Where should we send your estimate?", contactSub:"We only ask this once.",
    reviewLabel:"Review & send", allSet:"All set", reviewSub:"Send your request with one tap. The message opens ready to go, you just press send.", region:"Your request",
    sendSms:"Send by text message", sendWa:"Send on WhatsApp", sendMail:"Send by email", copy:"Copy summary", yes:"Yes",
    photosNote:"Don't forget to attach the photos of the stained glass to the message. ",
    consent:'By sending this request, you agree that GlassMaster Cleaning may contact you about your estimate by text, WhatsApp, phone or email. Message and data rates may apply. We never sell your information. <a href="privacy.html">Privacy Policy</a>',
    privacy:"privacy.html", serviceOf:(n,t)=>`Service ${n} of ${t}`, stepOf:(n,t)=>`Step ${n} of ${t}`, cont:"Continue", reviewBtn:"Review my request", getEst:"Get an estimate",
    chooseOne:"Choose at least one service", answerHl:"Please answer the highlighted question", copied:"Summary copied", noCopy:"Could not copy",
    hi:"Hi GlassMaster! I'd like to know more about your services.", subjQ:"Question about your services", subjEst:"Estimate request", msgStart:"Hi GlassMaster! I'd like an estimate.",
    contactHdr:"CONTACT", fName:"Name", fPhone:"Phone", fEmail:"Email", fAddress:"Address", fZip:"ZIP", fProperty:"Property",
    e_name:"Please enter your first and last name.", e_phone:"Please enter a valid phone number, like (754) 272-5100.", e_email:"Please enter a valid email, like name@gmail.com.", e_emailTypo:m=>`Please check your email. Did you mean ${m}?`, e_emailTemp:"Please use an email you check, not a temporary one.", e_address:"Please enter the street and house number, like 123 Main St.", e_zip:"Please enter a 5-digit ZIP code, like 33301.", w_zip:"This ZIP may be outside our usual service area. You can still send it and we'll confirm.", langBtn:"ES", langLabel:"Ver el sitio en español", langOther:"es" },
  es: { title:"Limpieza de ventanas en Fort Lauderdale y el sur de Florida | GlassMaster", area:"Atendemos los condados de Broward, Palm Beach y Miami-Dade",
    pickLabel:"Elija sus servicios", pickH:"¿En qué le podemos ayudar?", pickSub:"Seleccione uno o más servicios.", selAll:"Seleccionar todos los servicios", clearSel:"Quitar selección",
    contactLabel:"Sus datos de contacto", contactH:"¿A dónde le enviamos su presupuesto?", contactSub:"Solo se lo pedimos una vez.",
    reviewLabel:"Revisar y enviar", allSet:"¡Listo", reviewSub:"Envíe su solicitud con un toque. El mensaje se abre listo, solo tiene que presionar enviar.", region:"Su solicitud",
    sendSms:"Enviar por mensaje de texto", sendWa:"Enviar por WhatsApp", sendMail:"Enviar por correo", copy:"Copiar resumen", yes:"Sí",
    photosNote:"No olvide adjuntar al mensaje las fotos del vidrio manchado. ",
    consent:'Al enviar esta solicitud, usted acepta que GlassMaster Cleaning lo contacte sobre su presupuesto por mensaje de texto, WhatsApp, teléfono o correo electrónico. Pueden aplicarse cargos por mensajes y datos. Nunca vendemos su información. <a href="privacy-es.html">Política de privacidad</a>',
    privacy:"privacy-es.html", serviceOf:(n,t)=>`Servicio ${n} de ${t}`, stepOf:(n,t)=>`Paso ${n} de ${t}`, cont:"Continuar", reviewBtn:"Revisar mi solicitud", getEst:"Pedir presupuesto",
    chooseOne:"Elija al menos un servicio", answerHl:"Por favor responda la pregunta marcada", copied:"Resumen copiado", noCopy:"No se pudo copiar",
    hi:"¡Hola GlassMaster! Me gustaría saber más sobre sus servicios.", subjQ:"Pregunta sobre sus servicios", subjEst:"Solicitud de presupuesto", msgStart:"¡Hola GlassMaster! Me gustaría un presupuesto.",
    contactHdr:"CONTACTO", fName:"Nombre", fPhone:"Teléfono", fEmail:"Correo", fAddress:"Dirección", fZip:"ZIP", fProperty:"Propiedad",
    e_name:"Escriba su nombre y apellido.", e_phone:"Escriba un número de teléfono válido, como (754) 272-5100.", e_email:"Escriba un correo válido, como nombre@gmail.com.", e_emailTypo:m=>`Revise su correo. ¿Quiso decir ${m}?`, e_emailTemp:"Use un correo que usted revise, no uno temporal.", e_address:"Escriba la calle y el número, como 123 Main St.", e_zip:"Escriba un código postal de 5 dígitos, como 33301.", w_zip:"Este código postal puede estar fuera de nuestra zona habitual. Puede enviarlo igual y se lo confirmamos.", langBtn:"EN", langLabel:"View the site in English", langOther:"en" }
};
const TEXT_ES = {
  n_services:"Servicios", n_area:"Área de servicio", n_contact:"Contacto", n_quote:"Presupuesto",
  h_eyebrow:"Limpieza de ventanas y lavado a presión en el sur de la Florida",
  h_title:'Vidrios limpios. <span class="serif">Resultados claros.</span>',
  h_lead:"Las superficies limpias hacen más que verse bien. Protegen la apariencia de su propiedad, causan una buena primera impresión y forman parte del mantenimiento regular.",
  h_cta:"Pida un presupuesto gratis", h_text:"Envíenos un texto",
  h_chips:'<span class="chip">Ventanas residenciales</span><span class="chip">Ventanas comerciales</span><span class="chip">Manchas de agua dura</span><span class="chip">Lavado a presión</span><span class="chip">Paneles solares</span>',
  sv_e:"Nuestros servicios", sv_h:'Ventanas primero. <span class="serif">Y todo lo que las rodea</span> también.', sv_p:"Elija lo que necesita o combine servicios en una sola visita. Cada presupuesto se hace a la medida de su propiedad.",
  hw_e:"Mantenimiento continuo de su propiedad", hw_h:'La limpieza es una rutina, <span class="serif">no un arreglo de una vez.</span>',
  hw_p:"La limpieza de ventanas y exteriores funciona mejor como mantenimiento regular. Un calendario fijo mantiene su propiedad siempre presentable, en vez de esperar a que la suciedad y las manchas se noten. La frecuencia ideal depende de la ubicación, los árboles y el tráfico cercanos, la exposición al clima y sus expectativas.",
  hw_steps:'<div class="step"><b>1</b><div><strong>Cuéntenos qué necesita</strong><span>Elija uno o más servicios y responda unas preguntas rápidas.</span></div></div><div class="step"><b>2</b><div><strong>Envíelo con un toque</strong><span>Sus respuestas nos llegan directo por mensaje de texto o WhatsApp.</span></div></div><div class="step"><b>3</b><div><strong>Reciba su presupuesto</strong><span>Le recomendamos un plan de servicio y le enviamos un precio personalizado.</span></div></div>',
  q_e:"Pida un presupuesto", q_h:'Su presupuesto en <span class="serif">un minuto, más o menos.</span>', q_p:"Responda solo las preguntas de los servicios que elija. Sus datos de contacto se piden una sola vez, al final.",
  back:"Atrás",
  w_e:"Trabajos recientes", w_h:'Casas que mantenemos <span class="serif">impecables.</span>', w_p:"Algunas de las propiedades que cuidamos en el sur de la Florida.", w_ig:"Vea más en Instagram", w_rev:"Lea nuestras reseñas en Google",
  ba_e:"Antes y después", ba_h:'Vea la <span class="serif">diferencia.</span>', ba_before:"Antes", ba_after:"Después",
  ba_c1:"<strong>Vidrio de ducha · manchas de agua dura</strong>Manchas minerales y capa opaca eliminadas de una mampara de vidrio.",
  ba_c2:"<strong>Ventanas y pared exterior</strong>Marcos de ventana y la pared de abajo limpios de la capa verde.",
  ba_c3:"<strong>Deck de piscina · lavado a presión</strong>Suciedad oscura y moho eliminados del deck de piedra junto a la piscina.",
  ba_c4:"<strong>Pasillo lateral · lavado a presión</strong>Suciedad acumulada eliminada de los adoquines junto a la casa.",
  ar_e:"Área de servicio", ar_h:'Cuidado profesional de vidrios en todo <span class="serif">el sur de la Florida.</span>', ar_p:"¿No ve su ciudad? Envíenos un mensaje y verificamos la disponibilidad en su zona.",
  ar_main:"Zona principal", ar_n:"Norte", ar_s:"Sur", ar_bw:"Condado de Broward", ar_pb:"Condado de Palm Beach", ar_md:"Condado de Miami-Dade",
  fq_e:"Preguntas frecuentes", fq_h:'Buenas preguntas, <span class="serif">respuestas claras.</span>',
  fq_list:'<details class="faq-item reveal"><summary>¿Cómo obtengo un precio?</summary><p>Use el formulario de presupuesto de arriba o envíenos un mensaje de texto. Responda unas preguntas rápidas sobre su propiedad y le enviaremos un presupuesto personalizado. Los presupuestos son gratis.</p></details><details class="faq-item reveal"><summary>¿Cada cuánto debo limpiar mis ventanas?</summary><p>Depende de la ubicación, los árboles y el tráfico cercanos, la exposición al clima y qué tan impecables le gustan sus vidrios. Muchas propiedades funcionan mejor con un calendario regular, y en su presupuesto le sugerimos la frecuencia adecuada.</p></details><details class="faq-item reveal"><summary>¿Se pueden quitar todas las manchas de agua dura?</summary><p>La mayoría de la acumulación mineral se puede quitar o reducir mucho. Las manchas que llevan años pueden grabarse en el vidrio, y ese daño no siempre se puede revertir del todo. Envíenos fotos y le diremos qué esperar antes de la visita.</p></details><details class="faq-item reveal"><summary>¿Necesito estar en casa durante el servicio?</summary><p>No siempre. Para el trabajo exterior solo necesitamos acceso seguro a las áreas que vamos a limpiar. Confirmamos los detalles con usted al programar.</p></details><details class="faq-item reveal"><summary>¿Qué pasa si llueve el día del servicio?</summary><p>Si el clima no es seguro o adecuado para el trabajo, le avisamos y reprogramamos con usted.</p></details><details class="faq-item reveal"><summary>¿Qué zonas atienden?</summary><p>El condado de Broward es nuestra zona principal, y también atendemos los condados de Palm Beach y Miami-Dade. Si no ve su ciudad, envíenos un mensaje y lo verificamos.</p></details>',
  ct_e:"Contacto", ct_h:'¿Listo para <span class="serif">ver con más claridad?</span>',
  ct_p:"Contacte a GlassMaster Cleaning para hablar de su propiedad, las superficies que quiere limpiar y con qué frecuencia desea el servicio.",
  c_sms:"Mensaje de texto", c_sms2:"Respuesta más rápida", c_wa2:"También disponible", c_mail:"Correo electrónico", c_mail2:"Para solicitudes detalladas", c_ig2:"Vea nuestros trabajos recientes",
  f_tag:"Limpieza de ventanas en el sur de la Florida", f_priv:"Privacidad, términos y accesibilidad", f_by:"Sitio hecho por"
};
const ALT_ES = {
  "par1-before":"Mampara de vidrio de ducha cubierta de manchas blancas de agua dura antes de la limpieza",
  "par1-after":"El mismo vidrio de ducha transparente y sin manchas después de quitar el agua dura",
  "par2-before":"Ventana exterior con manchas verdes en la pared de abajo antes de la limpieza",
  "par2-after":"La misma ventana y la pared limpias después de la limpieza exterior",
  "par3-before":"Deck de piedra de la piscina junto a la casa cubierto de suciedad oscura y moho antes del lavado a presión",
  "par3-after":"El mismo deck de la piscina claro y limpio después del lavado a presión",
  "par4-before":"Adoquines del pasillo lateral oscuros por la suciedad y el moho antes del lavado a presión",
  "par4-after":"El mismo pasillo lateral limpio y claro después del lavado a presión"
};

/* the site always opens in English; Spanish only with the ES button or a ?lang=es link */
let LANG = new URLSearchParams(location.search).get("lang")==="es" ? "es" : "en";
const L = () => UI[LANG];
let SERVICES = SERVICES_EN, CONTACT_Q = CONTACT_Q_EN;

/* ===== helpers ===== */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* photo descriptions (alt text): service + place, one per photo */
const PHOTO_ALT = {
 en:{
 "hero": "Modern white home with pool and clean windows in South Florida",
 "heroMobile": "Modern white home with pool and clean windows in South Florida",
 "residential": "Technician on a ladder cleaning the entry windows of a home",
 "commercial": "Technician cleaning the glass entrance of a commercial building with a water-fed pole",
 "hardwater": "Glass shower door with hard water stains",
 "power": "Pool deck before and after pressure washing: dark dirt and mildew on the left, clean stone on the right",
 "solar": "Solar panels on a tiled roof",
 "w1": "Technician pressure washing the paver driveway of a modern two-story home",
 "w2": "Modern home with pool and spa and clean windows across the back",
 "w3": "Living room with floor-to-ceiling windows cleaned inside and out",
 "w4": "Two-story home with pool and clean rear windows",
 "w5": "Modern home with palm tree, pool and large sliding glass doors",
 "w6": "Two-story foyer with a glass stair railing after cleaning",
 "w7": "Tall arched entry windows and glass double front door",
 "w8": "White home with pool, balconies and clean glass railings",
 "w9": "Waterfront home with pool and large clean windows",
 "w11": "Mediterranean-style estate with palm trees and clean front windows",
 "w12": "Home with pool and wide windows on a sunny South Florida day",
 "w13": "Newly built modern home with large clean windows",
 "w14": "Technician inspecting floor-to-ceiling windows after cleaning",
 "w15": "Technician on a ladder cleaning a tall arched window",
 "w16": "Technicians cleaning the inside of a storefront's glass walls",
 "w18": "Tall windows set in a stone facade",
 "w19": "Glass balcony railing on a modern home",
 "w20": "Two-story home with clean windows and tropical landscaping",
 "w21": "Modern home entrance with tall windows and a paver driveway",
 "w22": "Restaurant windows cleaned on the outside",
 "w23": "Office building windows with flags in front",
 "w24": "Commercial building with a clean glass storefront",
 "w25": "Rear terrace and spa of a Mediterranean-style home with clean windows",
 "w26": "Arched entry and clean windows of a Mediterranean-style home",
 "w27": "Back patio and clean windows of a Mediterranean-style home",
 "w28": "Large bay window with grid panes after cleaning",
 "w29": "Two-story entry with tall windows and a floating staircase",
 "w30": "Modern home with pool and clean windows at dusk",
 "w31": "Floor-to-ceiling sliding glass doors facing a pool and waterway",
 "w33": "Side windows of a modern white home at sunset"
},
 es:{
 "hero": "Casa moderna blanca con piscina y ventanas limpias en el sur de la Florida",
 "heroMobile": "Casa moderna blanca con piscina y ventanas limpias en el sur de la Florida",
 "residential": "Técnico en una escalera limpiando las ventanas de la entrada de una casa",
 "commercial": "Técnico limpiando la entrada de vidrio de un edificio comercial con una pértiga de agua",
 "hardwater": "Mampara de ducha con manchas de agua dura",
 "power": "Deck de piscina antes y después del lavado a presión: suciedad y moho a la izquierda, piedra limpia a la derecha",
 "solar": "Paneles solares en un techo de tejas",
 "w1": "Técnico lavando a presión la entrada de adoquines de una casa moderna de dos pisos",
 "w2": "Casa moderna con piscina y jacuzzi y ventanas limpias en la parte trasera",
 "w3": "Sala con ventanales de piso a techo limpios por dentro y por fuera",
 "w4": "Casa de dos pisos con piscina y ventanas traseras limpias",
 "w5": "Casa moderna con palmera, piscina y grandes puertas corredizas de vidrio",
 "w6": "Vestíbulo de dos pisos con baranda de vidrio después de la limpieza",
 "w7": "Ventanas altas en arco y puerta doble de vidrio en la entrada",
 "w8": "Casa blanca con piscina, balcones y barandas de vidrio limpias",
 "w9": "Casa frente al agua con piscina y grandes ventanas limpias",
 "w11": "Residencia de estilo mediterráneo con palmeras y ventanas delanteras limpias",
 "w12": "Casa con piscina y ventanas amplias en un día soleado del sur de la Florida",
 "w13": "Casa moderna recién construida con grandes ventanas limpias",
 "w14": "Técnico revisando ventanales de piso a techo después de la limpieza",
 "w15": "Técnico en una escalera limpiando una ventana alta en arco",
 "w16": "Técnicos limpiando por dentro las paredes de vidrio de un local",
 "w18": "Ventanas altas en una fachada de piedra",
 "w19": "Baranda de vidrio en el balcón de una casa moderna",
 "w20": "Casa de dos pisos con ventanas limpias y jardín tropical",
 "w21": "Entrada de una casa moderna con ventanas altas y entrada de adoquines",
 "w22": "Ventanas de un restaurante limpias por fuera",
 "w23": "Ventanas de un edificio de oficinas con banderas al frente",
 "w24": "Edificio comercial con fachada de vidrio limpia",
 "w25": "Terraza trasera y jacuzzi de una casa mediterránea con ventanas limpias",
 "w26": "Entrada en arco y ventanas limpias de una casa mediterránea",
 "w27": "Patio trasero y ventanas limpias de una casa mediterránea",
 "w28": "Gran ventana mirador con cuadrícula después de la limpieza",
 "w29": "Entrada de dos pisos con ventanas altas y escalera flotante",
 "w30": "Casa moderna con piscina y ventanas limpias al atardecer",
 "w31": "Puertas corredizas de vidrio de piso a techo frente a la piscina y el canal",
 "w33": "Ventanas laterales de una casa moderna blanca al atardecer"
}
};
const TITLE_ES = {"t_sms": "Enviar un mensaje de texto a GlassMaster Cleaning", "t_wa": "Escribir a GlassMaster Cleaning por WhatsApp", "t_mail": "Enviar un correo a GlassMaster Cleaning", "t_ig": "GlassMaster Cleaning en Instagram", "t_rev": "Reseñas de GlassMaster Cleaning en Google"};
const altFor = el => { const src = el.querySelector("img")?.getAttribute("src")||""; const m = src.match(/work-(\d+)\.jpg/); return PHOTO_ALT[LANG][m ? "w"+m[1] : (src.includes("hero-mobile") ? "heroMobile" : el.dataset.photo)] || ""; };
const photo = (key, cls="") => `<div class="ph ${cls}" data-photo="${key}"></div>`;
function loadPhotos(root=document){
  root.querySelectorAll(".ph[data-photo]:not([data-done])").forEach(el=>{
    el.dataset.done = 1;
    const key = el.dataset.photo === "hero" && matchMedia("(max-width:700px)").matches ? "heroMobile" : el.dataset.photo;
    const src = FOTOS[key]; if(!src) return;
    const img = new Image(); img.alt = ""; img.loading = "lazy";
    if(FOCUS[el.dataset.photo]) img.style.objectPosition = FOCUS[el.dataset.photo];
    img.onload = () => el.classList.add("loaded");
    img.src = src; el.appendChild(img); img.alt = altFor(el);
  });
}
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("on"); clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove("on"),2600); }

/* logo: use img/logo.png when it exists */
(() => { const i=new Image(); i.onload=()=>{ document.querySelectorAll(".brand-mark").forEach(m=>{ const c=i.cloneNode(); c.className="brand-logo"; c.alt=""; m.replaceWith(c); }); }; i.src=FOTOS.logo; })();

/* recent work gallery */
FOTOS.work.forEach((src,i)=>{ FOTOS["work"+i]=src; });
$("#gallery").innerHTML = FOTOS.work.map((_,i)=>photo("work"+i,"g-item reveal")).join("");

/* ===== contact links ===== */
const smsLink = body => `sms:+${CONFIG.phoneDigits}${body?`?&body=${encodeURIComponent(body)}`:""}`;
const waLink = body => `https://wa.me/${CONFIG.phoneDigits}${body?`?text=${encodeURIComponent(body)}`:""}`;
const mailLink = (body, subj=L().subjEst) => `mailto:${CONFIG.email}?subject=${encodeURIComponent(subj)}${body?`&body=${encodeURIComponent(body)}`:""}`;
CONFIG.ighandle = "@" + CONFIG.instagram;
document.querySelectorAll("[data-show]").forEach(el => el.textContent = CONFIG[el.dataset.show]);
function setLinks(){
  document.querySelectorAll("[data-link]").forEach(el => {
    const k = el.dataset.link, hi = L().hi;
    el.href = k==="sms" ? smsLink(hi) : k==="wa" ? waLink(hi) : k==="ig" ? `https://www.instagram.com/${CONFIG.instagram}/` : k==="reviews" ? CONFIG.reviews : mailLink("", L().subjQ);
    if(k==="wa"||k==="ig"||k==="reviews") { el.target="_blank"; el.rel="noopener"; }
  });
}
if(!CONFIG.email) document.querySelectorAll('[data-needs="email"]').forEach(el=>el.remove());
if(!CONFIG.reviews) document.querySelectorAll('[data-link="reviews"]').forEach(el=>el.remove());
$("#yr").textContent = new Date().getFullYear();

/* ===== services section ===== */
const renderServices = () => $("#svc-list").innerHTML = SERVICES.map((s,i)=>`
  <article class="svc reveal">
    ${photo(s.photo,"svc-photo")}
    <div class="svc-body">
      <span class="svc-num">0${i+1} / 0${SERVICES.length}</span>
      <h3>${s.name}</h3>
      <p class="what">${s.what}</p>
      <ul class="benefits">${s.benefits.map(b=>`<li>${b}</li>`).join("")}</ul>
      <p class="note">${s.note}</p>
      <a class="btn btn-primary" href="#quote" data-pre="${s.id}">${L().getEst}</a>
    </div>
  </article>`).join("");

/* ===== quote wizard ===== */
const state = { picked:new Set(), answers:{}, contact:{}, step:0 };
const steps = () => ["pick", ...SERVICES.filter(s=>state.picked.has(s.id)).map(s=>s.id), "contact", "review"];

function optButtons(scope, q, current){
  const sel = q.multi ? (current||[]) : [current];
  return `<div class="opts" role="group" aria-labelledby="ql-${scope}-${q.id}">${q.opts.map(o=>`<button type="button" class="opt" data-scope="${scope}" data-q="${q.id}" data-v="${esc(o)}" ${q.multi?'data-multi="1"':""} aria-pressed="${sel.includes(o)}">${esc(o)}</button>`).join("")}</div>`;
}
function questionHTML(scope, q, current){
  const hint = q.hint ? ` <span class="hint">(${q.hint})</span>` : "";
  if(q.opts) return `<div class="q" data-qid="${q.id}"><span class="ql" id="ql-${scope}-${q.id}">${q.q}${hint}</span>${optButtons(scope,q,current)}</div>`;
  if(q.text) return `<div class="q" data-qid="${q.id}"><label for="f-${scope}-${q.id}">${q.q}${hint}</label><textarea maxlength="600" id="f-${scope}-${q.id}"${q.optional?"":" aria-required=\"true\""} data-scope="${scope}" data-q="${q.id}">${esc(current||"")}</textarea></div>`;
  return `<div class="q" data-qid="${q.id}"><label for="f-${q.id}">${q.q}${q.hint?`<span class="hint" style="display:block;margin-top:2px">${q.hint}</span>`:""}</label><input id="f-${q.id}"${q.optional?"":" aria-required=\"true\""} type="${q.type}" autocomplete="${q.auto}"${q.id==="zip"?' inputmode="numeric"':""} maxlength="${MAXLEN[q.id]||120}" aria-describedby="e-${q.id}" data-scope="${scope}" data-q="${q.id}" value="${esc(current||"")}"><p class="fmsg" id="e-${q.id}" aria-live="polite"></p></div>`;
}

function render(){
  const list = steps(); state.step = Math.min(state.step, list.length-1);
  const cur = list[state.step], body = $("#wz-body");
  let html = "", label = "";
  if(cur==="pick"){
    label = L().pickLabel;
    html = `<div class="wz-step on"><h3>${L().pickH}</h3><p class="sub">${L().pickSub}</p>
      <div class="pick-grid">${SERVICES.map(s=>`<button type="button" class="pick" data-pick="${s.id}" aria-pressed="${state.picked.has(s.id)}">${photo(s.photo)}<span class="tick"></span><div class="t">${s.name}</div></button>`).join("")}</div>
      <button type="button" class="select-all" id="sel-all">${state.picked.size===SERVICES.length?L().clearSel:L().selAll}</button></div>`;
  } else if(cur==="contact"){
    label = L().contactLabel;
    const c = state.contact;
    html = `<div class="wz-step on"><h3>${L().contactH}</h3><p class="sub">${L().contactSub}</p>
      <div class="grid2">${CONTACT_Q.slice(0,2).map(q=>questionHTML("contact",q,c[q.id])).join("")}</div>
      ${questionHTML("contact",CONTACT_Q[2],c.email)}
      <div class="grid2 addr">${CONTACT_Q.slice(3,5).map(q=>questionHTML("contact",q,c[q.id])).join("")}</div>
      ${questionHTML("contact",CONTACT_Q[5],c.ptype)}</div>`;
  } else if(cur==="review"){
    label = L().reviewLabel;
    const msg = buildMessage();
    html = `<div class="wz-step on"><h3>${L().allSet}, ${esc(state.contact.name.split(" ")[0])}!</h3><p class="sub">${L().reviewSub}</p>
      <div class="summary" tabindex="0" role="region" aria-label="${L().region}">${esc(msg)}</div>
      <div class="send">
        <a class="btn btn-primary" href="${smsLink(msg)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z"/></svg>${L().sendSms}</a>
        <a class="btn btn-wa" href="${waLink(msg)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 1.9 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>${L().sendWa}</a>
        ${CONFIG.email?`<a class="btn btn-mail" href="${mailLink(msg)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>${L().sendMail}</a>`:""}
        <button type="button" class="btn btn-light" id="copy">${L().copy}</button>
      </div>
      <p class="send-note">${state.answers.hardwater?.photos?.startsWith(L().yes)?L().photosNote:""}</p>
      <p class="send-note">${L().consent}</p></div>`;
  } else {
    const s = SERVICES.find(x=>x.id===cur), a = state.answers[cur] ||= {};
    label = s.name;
    html = `<div class="wz-step on"><div class="svc-banner">${photo(s.photo)}<div><small>${L().serviceOf(list.indexOf(cur), state.picked.size)}</small><h3>${s.name}</h3></div></div>
      ${s.questions.map(q=>questionHTML(cur,q,a[q.id])).join("")}</div>`;
  }
  body.innerHTML = html; loadPhotos(body);
  if(cur==="contact") zipHint();
  $("#wz-label").textContent = label;
  $("#wz-count").textContent = L().stepOf(state.step+1, list.length);
  $("#wz-bar").style.width = `${((state.step+1)/list.length)*100}%`;
  $("#wz-back").style.visibility = state.step ? "visible" : "hidden";
  $("#wz-next").style.display = cur==="review" ? "none" : "";
  $("#wz-next").textContent = list[state.step+1]==="review" ? L().reviewBtn : L().cont;
}

function store(el){
  const {scope, q} = el.dataset, bucket = scope==="contact" ? state.contact : (state.answers[scope] ||= {});
  if(el.classList.contains("opt")){
    if(el.dataset.multi){
      const arr = bucket[q] ||= [], v = el.dataset.v, i = arr.indexOf(v);
      i<0 ? arr.push(v) : arr.splice(i,1);
      el.setAttribute("aria-pressed", i<0);
    } else {
      bucket[q] = el.dataset.v;
      el.parentElement.querySelectorAll(".opt").forEach(b=>b.setAttribute("aria-pressed", b===el));
    }
  } else bucket[q] = el.value.trim();
  const box = el.closest(".q"); box?.classList.remove("err"); el.removeAttribute("aria-invalid");
  const m = box?.querySelector(".fmsg"); if(m && !m.classList.contains("warn")) m.textContent = "";
  if(q==="zip") zipHint();
}

/* ===== Data checks (PineWeb rule: catch typos and fake contact details before the request is sent) ===== */
const MAXLEN = {name:80, phone:25, email:120, address:150, zip:10};
const JUNK = /^(test|teste|testing|asdf|qwerty|fake|none|nada|xxx+|abc|aaa+|no|na|n\/a)$/i;
const TYPOS = {"gmial.com":"gmail.com","gmai.com":"gmail.com","gmal.com":"gmail.com","gnail.com":"gmail.com","gmail.co":"gmail.com","gmail.con":"gmail.com","gmail.cm":"gmail.com","gmail.om":"gmail.com","gamil.com":"gmail.com",
  "hotmial.com":"hotmail.com","hotmal.com":"hotmail.com","hotmail.co":"hotmail.com","hotmail.con":"hotmail.com","yaho.com":"yahoo.com","yahooo.com":"yahoo.com","yahoo.con":"yahoo.com",
  "outlok.com":"outlook.com","outlook.co":"outlook.com","outlook.con":"outlook.com","iclod.com":"icloud.com","icloud.co":"icloud.com","icloud.con":"icloud.com","aol.co":"aol.com"};
const TEMP_MAIL = ["mailinator.com","guerrillamail.com","10minutemail.com","yopmail.com","tempmail.com","temp-mail.org","trashmail.com","sharklasers.com","getnada.com","dispostable.com","maildrop.cc"];
const usPhone = v => { let d = v.replace(/\D/g,""); if(d.length===11 && d[0]==="1") d = d.slice(1); return d; };
const CHECK = {
  name: v => { const w = v.trim().split(/\s+/);
    return (w.length<2 || !w.every(x=>/^[\p{L}][\p{L}'’.\-]*$/u.test(x)) || w.join("").replace(/[^\p{L}]/gu,"").length<4 || w.some(x=>JUNK.test(x)) || /(.)\1{3}/i.test(v)) ? L().e_name : ""; },
  phone: v => { const t = v.trim();
    if(/^\+(?!1)/.test(t)){ const d = t.replace(/\D/g,""); return d.length>=8 && d.length<=15 && !/^(\d)\1+$/.test(d) ? "" : L().e_phone; } // other countries
    const d = usPhone(t);
    return d.length===10 && /^[2-9]\d{2}[2-9]\d{6}$/.test(d) && !/^(\d)\1+$/.test(d) && !/^\d{3}55501\d{2}$/.test(d) && d!=="2345678901" ? "" : L().e_phone; },
  email: v => { const t = v.trim().toLowerCase();
    if(!/^[a-z0-9._%+\-]+@[a-z0-9\-]+(\.[a-z0-9\-]+)*\.[a-z]{2,}$/.test(t) || /\.\.|^\.|\.@/.test(t)) return L().e_email;
    const [user, dom] = t.split("@");
    if(TYPOS[dom]) return L().e_emailTypo(`${user}@${TYPOS[dom]}`);
    if(TEMP_MAIL.includes(dom)) return L().e_emailTemp;
    return JUNK.test(user) ? L().e_email : ""; },
  address: v => { const t = v.trim(); return t.length>=6 && /\d/.test(t) && (t.match(/\p{L}/gu)||[]).length>=3 && !/(.)\1{3}/.test(t) ? "" : L().e_address; },
  zip: v => /^\d{5}(-\d{4})?$/.test(v.trim()) && !/^0{5}/.test(v.trim()) ? "" : L().e_zip
};
const prettyPhone = v => { const d = usPhone(v); return !/^\s*\+(?!1)/.test(v) && d.length===10 ? `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}` : v.trim(); };
/* GlassMaster serves Broward, Palm Beach and Miami-Dade: ZIPs starting 330 to 334. Outside that we only warn. */
const inArea = z => /^33[0-4]/.test(z.trim());
function zipHint(){
  const z = state.contact.zip||"", m = $("#e-zip"); if(!m) return;
  if(!CHECK.zip(z) && !inArea(z)){ m.textContent = L().w_zip; m.classList.add("warn"); } else if(m.classList.contains("warn")){ m.textContent = ""; m.classList.remove("warn"); }
}

function validate(){
  const cur = steps()[state.step];
  if(cur==="pick"){ if(!state.picked.size){ toast(L().chooseOne); return false; } return true; }
  const qs = cur==="contact" ? CONTACT_Q : SERVICES.find(s=>s.id===cur).questions;
  const bucket = cur==="contact" ? state.contact : state.answers[cur];
  let bad = null;
  qs.forEach(q=>{
    if(q.optional) return;
    let v = bucket[q.id], ok = Array.isArray(v) ? v.length>0 : !!v, why = "";
    if(cur==="contact" && CHECK[q.id]){ why = CHECK[q.id](v||""); ok = !why; }
    const el = $(`#wz-body .q[data-qid="${q.id}"]`), msg = el.querySelector(".fmsg");
    if(msg){ msg.textContent = why; msg.classList.remove("warn"); }
    if(!ok){ el.classList.add("err"); el.querySelector("input,textarea")?.setAttribute("aria-invalid","true"); bad ||= el; }
  });
  if(cur==="contact") zipHint();
  if(bad){ bad.scrollIntoView({behavior:"smooth",block:"center"}); bad.querySelector("input,textarea,button")?.focus({preventScroll:true}); toast(L().answerHl); return false; }
  return true;
}

function buildMessage(){
  const c = state.contact, T = L(), lines = [T.msgStart, ""];
  SERVICES.filter(s=>state.picked.has(s.id)).forEach(s=>{
    lines.push(`▸ ${s.name.toUpperCase()}`);
    const a = state.answers[s.id] || {};
    s.questions.forEach(q=>{
      const v = a[q.id]; if(!v || (Array.isArray(v)&&!v.length)) return;
      lines.push(`• ${q.q.replace(/^¿|\?$/g,"")}: ${Array.isArray(v)?v.join(", "):v}`);
    });
    lines.push("");
  });
  lines.push(`▸ ${T.contactHdr}`, `• ${T.fName}: ${c.name}`, `• ${T.fPhone}: ${prettyPhone(c.phone)}`, `• ${T.fEmail}: ${c.email.toLowerCase()}`, `• ${T.fAddress}: ${c.address}`, `• ${T.fZip}: ${c.zip}`, `• ${T.fProperty}: ${c.ptype}`);
  return lines.join("\n");
}

$("#wizard").addEventListener("click", e=>{
  const pick = e.target.closest("[data-pick]"), opt = e.target.closest(".opt");
  if(pick){ const id = pick.dataset.pick; state.picked.has(id) ? state.picked.delete(id) : state.picked.add(id); pick.setAttribute("aria-pressed", state.picked.has(id)); $("#sel-all").textContent = state.picked.size===SERVICES.length?L().clearSel:L().selAll; }
  else if(e.target.id==="sel-all"){ state.picked.size===SERVICES.length ? state.picked.clear() : SERVICES.forEach(s=>state.picked.add(s.id)); render(); }
  else if(opt) store(opt);
  else if(e.target.id==="copy"){ navigator.clipboard?.writeText(buildMessage()).then(()=>toast(L().copied),()=>toast(L().noCopy)); }
});
$("#wizard").addEventListener("input", e=>{ if(e.target.dataset.q) store(e.target); });
/* move keyboard / screen reader focus to the new step title */
const focusStep = ()=>{ const h=$("#wz-body h3"); if(h){ h.tabIndex=-1; h.focus({preventScroll:true}); } };
$("#wz-next").onclick = ()=>{ if(validate()){ state.step++; render(); focusStep(); $("#wizard").scrollIntoView({behavior:"smooth",block:"start"}); } };
$("#wz-back").onclick = ()=>{ state.step--; render(); focusStep(); };
$("#svc-list").addEventListener("click", e=>{ const a=e.target.closest("[data-pre]"); if(a){ state.picked.add(a.dataset.pre); state.step=0; render(); } });

/* ===== language ===== */
const TEXT_EN = {}, ALT_EN = {};
document.querySelectorAll("[data-i18n]").forEach(el => TEXT_EN[el.dataset.i18n] = el.innerHTML);
document.querySelectorAll("[data-i18n-alt]").forEach(el => ALT_EN[el.dataset.i18nAlt] = el.alt);
function applyLang(lang){
  LANG = lang;
  const es = lang==="es", T = L();
  SERVICES = es ? SERVICES_ES : SERVICES_EN; CONTACT_Q = es ? CONTACT_Q_ES : CONTACT_Q_EN;
  document.documentElement.lang = lang; document.title = T.title;
  document.querySelectorAll("[data-i18n]").forEach(el => { const k = el.dataset.i18n; el.innerHTML = es && TEXT_ES[k] ? TEXT_ES[k] : TEXT_EN[k]; });
  document.querySelectorAll("[data-i18n-alt]").forEach(el => { const k = el.dataset.i18nAlt; el.alt = es ? ALT_ES[k] : ALT_EN[k]; });
  document.querySelectorAll("[data-i18n-title]").forEach(el => { el.dataset.titleEn ??= el.title; el.title = es ? TITLE_ES[el.dataset.i18nTitle] : el.dataset.titleEn; });
  document.querySelectorAll(".ph[data-photo] img").forEach(img => img.alt = altFor(img.parentElement));
  if(T.area) $("#area-line").textContent = T.area + ". " + $("#area-line").textContent;
  $("#privacy-link").href = T.privacy;
  const b = $("#lang-btn"); b.textContent = T.langBtn; b.lang = T.langOther; b.setAttribute("aria-label", `${T.langBtn}: ${T.langLabel}`);
  setLinks(); renderServices(); loadPhotos($("#svc-list"));
  /* answers are stored as option labels, so a language change starts the estimate over */
  state.answers = {}; state.step = Math.min(state.step, 0); render();
  /* content swapped after first load is shown right away, without the scroll animation */
  if(window.io) document.querySelectorAll("#svc-list .reveal, [data-i18n] .reveal").forEach(el=>el.classList.add("in"));
}
$("#lang-btn").addEventListener("click", ()=>{
  const next = LANG==="es" ? "en" : "es";
  applyLang(next);
  const u = new URL(location.href); u.searchParams.set("lang", next); history.replaceState(null, "", u);
  $("#lang-btn").focus();
});

/* ===== page behaviour ===== */
applyLang(LANG); loadPhotos();
const bar = $("#top-bar"); const onScroll=()=>bar.classList.toggle("solid", scrollY>40); addEventListener("scroll",onScroll,{passive:true}); onScroll();
window.io = new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target);} }),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
