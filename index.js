
'use strict';

const state = {
    currentScreen: 'welcome', // welcome, quiz, results
    language: 'it', // 'it', 'en'
    currentCategoryKey: 'mixed', // Categoria mista
    currentQuestionIndex: 0,
    questions: [],
    userAnswers: [],
    score: 0,
};

const QUIZ_DATA_IT = {
    office: {
        name: "Ufficio & Gaming Station",
        description: "Domande su postura, cavi e cosa fare quando il PC decide di friggere. Seriamente.",
        questions: [
            { question: "Qual è la postura corretta per non diventare un tutt'uno con la sedia?", answers: ["Schiena dritta, piedi a terra, schermo all'altezza degli occhi", "Posizione del gamberetto per massimizzare la concentrazione", "Sdraiat* sulla sedia, perché la comodità è tutto", "Usare una pila di libri al posto della sedia per tenersi attivi"], correct: "Schiena dritta, piedi a terra, schermo all'altezza degli occhi" },
            { question: "Vedi del fumo uscire da una ciabatta elettrica. La tua prima mossa?", answers: ["Staccare la corrente generale, se è sicuro farlo", "Buttarci sopra il caffè per unire due problemi", "Urlare 'AL FUOCO!' e iniziare a filmare per i social", "Soffiarci sopra delicatamente come per le candeline"], correct: "Staccare la corrente generale, se è sicuro farlo" },
            { question: "Ogni quanto dovresti fare una pausa dal monitor per evitare gli occhi laser?", answers: ["Ogni 20-30 minuti, guardando lontano", "Mai, le pause sono per i deboli", "Solo quando inizi a vedere i pixel nella vita reale", "Ogni volta che perdi a Fortnite"], correct: "Ogni 20-30 minuti, guardando lontano" },
            { question: "Un cavo di alimentazione è sfilacciato. Che fai?", answers: ["Smetti di usarlo, lo segnali e chiedi di cambiarlo", "Lo ripari con del nastro adesivo colorato per un tocco di stile", "Lo ignori, finché funziona non c'è problema", "Lo usi per legare le piante alla scrivania"], correct: "Smetti di usarlo, lo segnali e chiedi di cambiarlo" },
            { question: "La tua sedia da ufficio sta perdendo olio idraulico. Qual è la priorità?", answers: ["Segnalare il problema e non usarla finché non è riparata", "Mettere dei giornali sotto per proteggere il pavimento", "Continuare a usarla, tanto l'olio fa bene al pavimento", "Vendere la sedia su eBay come 'vintage con patina'"], correct: "Segnalare il problema e non usarla finché non è riparata" },
            { question: "Il mouse wireless non funziona più. Prima cosa da controllare?", answers: ["Batterie scariche o connessione wireless", "Se qualcuno ha rubato il cursore", "Se il mouse è in modalità vacanza", "Se serve un caffè anche al mouse"], correct: "Batterie scariche o connessione wireless" },
            { question: "Lavori 8+ ore al computer. Come proteggi la vista?", answers: ["Pausa ogni 20 min, regola luminosità e usa filtro luce blu", "Strizzare gli occhi molto forte per allenarli", "Guardare il sole per bilanciare la luce blu", "Comprare occhiali da sole da pilota"], correct: "Pausa ogni 20 min, regola luminosità e usa filtro luce blu" },
            { question: "La scrivania è troppo alta o troppo bassa. Cosa fai?", answers: ["Regolare l'altezza della sedia o usare un poggiapiedi", "Crescere o rimpicciolirsi di conseguenza", "Lavorare in ginocchio o in punta di piedi", "Convincere la scrivania a cambiare idea"], correct: "Regolare l'altezza della sedia o usare un poggiapiedi" }
        ]
    },
    construction: {
        name: "Cantiere Hardcore",
        description: "Quiz su caschi, impalcature e come non diventare un cartone animato che cade dall'alto.",
        questions: [
            { question: "Cosa è fondamentale indossare in un cantiere con rischio di caduta oggetti?", answers: ["Elmetto di protezione", "Un cappello di paglia per il sole", "Cuffie con musica a palla per la motivazione", "Una parrucca colorata per rallegrare l'ambiente"], correct: "Elmetto di protezione" },
            { question: "Cosa indica un nastro a strisce bianche e rosse?", answers: ["Un'area di pericolo o un cantiere", "La linea di partenza per una gara di carriole", "Una decorazione per la festa di cantiere", "Il punto dove si ordina la pizza"], correct: "Un'area di pericolo o un cantiere" },
            { question: "Prima di usare un'impalcatura, cosa devi assolutamente controllare?", answers: ["Che sia stabile, completa e autorizzata", "Che abbia una buona vista panoramica per le foto", "Se il tuo nome è scritto da qualche parte", "Se ci sono nidi di uccelli esotici"], correct: "Che sia stabile, completa e autorizzata" },
            { question: "Cosa NON devi fare vicino a una gru in movimento?", answers: ["Passare sotto il carico sospeso", "Salutare l'operatore con la mano", "Indossare scarpe antinfortunistiche", "Chiedere se ti dà un passaggio fino al bar"], correct: "Passare sotto il carico sospeso" },
            { question: "Le scarpe antinfortunistiche devono avere:", answers: ["Punta rinforzata, suola antiscivolo e protezione alla caviglia", "Lacci colorati per distinguerti dalla massa", "Luci a LED per lavori notturni", "Un compartimento segreto per snack"], correct: "Punta rinforzata, suola antiscivolo e protezione alla caviglia" },
            { question: "Vedi un collega lavorare senza casco. Cosa fai?", answers: ["Lo avverto del pericolo e segnalo se necessario", "Gli lancio il mio casco come un frisbee", "Inizio a fischiare la sigla di Superman", "Fingo di non vedere, ognuno per sé"], correct: "Lo avverto del pericolo e segnalo se necessario" },
            { question: "Prima di entrare in uno scavo profondo devi verificare:", answers: ["Stabilità delle pareti, presenza di gas e vie di fuga", "Se ci sono tesori sepolti", "Il WiFi per aggiornare i social", "Se il buco è Instagram-friendly"], correct: "Stabilità delle pareti, presenza di gas e vie di fuga" },
            { question: "Il cartello con il punto esclamativo indica:", answers: ["Pericolo generico, stai attento", "Che qualcuno è molto sorpreso", "La prossima fermata dell'autobus", "Il punto dove fare la pausa caffè"], correct: "Pericolo generico, stai attento" }
        ]
    },
    lab: {
        name: "Laboratorio da Scienziato Pazzo",
        description: "Rischio chimico, sostanze misteriose e come non far saltare in aria l'edificio. O quasi.",
        questions: [
            { question: "Come si diluisce un acido concentrato con acqua?", answers: ["Versando l'acido nell'acqua, lentamente", "Versando l'acqua nell'acido, molto velocemente", "Mescolandoli in un frullatore per un mix omogeneo", "Chiedendo al collega più simpatico di farlo al posto tuo"], correct: "Versando l'acido nell'acqua, lentamente" },
            { question: "Il simbolo del teschio su una bottiglia cosa indica?", answers: ["Tossicità acuta, roba che fa malissimo", "Che dentro c'è una pozione per pirati", "Prodotto con ingredienti 'da paura'", "Che è il veleno per la suocera"], correct: "Tossicità acuta, roba che fa malissimo" },
            { question: "Quale DPI è vitale quando maneggi sostanze volatili tossiche?", answers: ["Lavorare sotto una cappa chimica aspirante", "Trattenere il respiro molto a lungo", "Una mascherina di stoffa con i glitter", "Aprire la finestra e sperare nel vento a favore"], correct: "Lavorare sotto una cappa chimica aspirante" },
            { question: "Ti schizzi una sostanza chimica negli occhi. Prima cosa da fare?", answers: ["Usare subito la stazione di lavaggio oculare per almeno 15 minuti", "Strofinare forte per toglierla", "Mettere due fette di cetriolo per un trattamento di bellezza", "Urlare 'ORA HO I SUPERPOTERI!'"], correct: "Usare subito la stazione di lavaggio oculare per almeno 15 minuti" },
            { question: "La scheda di sicurezza (SDS) di un prodotto chimico serve per:", answers: ["Conoscere i rischi, le precauzioni e il primo soccorso", "Avere qualcosa da leggere durante la pausa", "Decorare il laboratorio con documenti importanti", "Fare aeroplanini di carta resistenti"], correct: "Conoscere i rischi, le precauzioni e il primo soccorso" },
            { question: "I guanti in lattice vanno usati con:", answers: ["Sostanze non aggressive, ma NON con solventi organici", "Qualsiasi cosa, sono magici", "Solo per fare le bolle di sapone", "Esclusivamente per apparire professionali"], correct: "Sostanze non aggressive, ma NON con solventi organici" },
            { question: "Odori una sostanza sconosciuta per identificarla. È:", answers: ["PERICOLOSISSIMO! Non annusare mai sostanze chimiche", "Il metodo del sommelier chimico", "Una tecnica ancestrale dei laboratori", "Un modo per sviluppare un super olfatto"], correct: "PERICOLOSISSIMO! Non annusare mai sostanze chimiche" },
            { question: "Il frigorifero del laboratorio può contenere:", answers: ["Solo reagenti chimici, MAI cibo o bevande", "La merenda di emergenza per le notti brave", "Il pranzo del professore (a suo rischio)", "Birre per festeggiare gli esperimenti riusciti"], correct: "Solo reagenti chimici, MAI cibo o bevande" }
        ]
    },
    home: {
        name: "Casa Dolce Casa (?)",
        description: "Incendi in cucina, prese elettriche traditrici e perché non dovresti pulire il pavimento con la benzina.",
        questions: [
            { question: "Se una pentola d'olio prende fuoco in cucina, cosa fai?", answers: ["Soffochi le fiamme con un coperchio o un panno umido", "Ci butti sopra dell'acqua per vedere l'effetto vulcano", "Inizi a cucinarci i popcorn", "La porti in giro per casa urlando 'È IL SACRO FUOCO!'"], correct: "Soffochi le fiamme con un coperchio o un panno umido" },
            { question: "Stai usando il phon e cade nella vasca piena d'acqua. Che fai?", answers: ["NON toccarlo e stacchi subito la corrente generale", "Lo recuperi al volo, la regola dei 5 secondi vale anche per l'elettricità", "Ti tuffi per salvarlo, è il tuo phon preferito", "Inizi a parlare con i pesci che ora vivono nella vasca"], correct: "NON toccarlo e stacchi subito la corrente generale" },
            { question: "Senti odore di gas in casa. Prima azione da compiere?", answers: ["Apri subito le finestre, non accendere luci e chiudi il rubinetto del gas", "Accendi una candela profumata per coprire l'odore", "Inizi a cercare la perdita con un accendino", "Dai la colpa al cane e ordini una pizza"], correct: "Apri subito le finestre, non accendere luci e chiudi il rubinetto del gas" },
            { question: "Vedi una presa elettrica annerita. Cosa significa?", answers: ["C'è un sovraccarico o un cortocircuito, va fatta controllare subito", "È un nuovo design 'dark mode' per la casa", "Qualcuno ha provato a caricarci un tostapane al contrario", "La presa è triste e va consolata"], correct: "C'è un sovraccarico o un cortocircuito, va fatta controllare subito" },
            { question: "Il detersivo si è mischiato con la candeggina. Che succede?", answers: ["Si creano gas tossici pericolosissimi, esci e arieggia subito", "Nasce il detergente supremo per le pulizie", "Il pavimento diventa autolavante", "Ottieni lo sbiancante per i denti gratis"], correct: "Si creano gas tossici pericolosissimi, esci e arieggia subito" },
            { question: "Hai una fuga d'acqua dal soffitto. Prima cosa da fare?", answers: ["Chiudere l'acqua generale e chiamare un idraulico", "Mettere secchi ovunque e trasformare casa in un acquario", "Ignorarla, forse si sistema da sola", "Vendere casa come 'con effetti speciali inclusi'"], correct: "Chiudere l'acqua generale e chiamare un idraulico" },
            { question: "Il rilevatore di fumo suona continuamente. Cosa NON devi fare?", answers: ["Togliere le batterie per farlo smettere", "Controllare se c'è davvero fumo", "Uscire di casa se necessario", "Chiamare i vigili del fuoco in caso di dubbio"], correct: "Togliere le batterie per farlo smettere" },
            { question: "Usi la scala per cambiare una lampadina. Regola d'oro?", answers: ["Sempre qualcuno a tenerti la scala, mai da solo", "Più alta è, più divertente diventa", "Usarla come trampolino per lavori acrobatici", "Più veloce sali, prima finisci"], correct: "Sempre qualcuno a tenerti la scala, mai da solo" }
        ]
    }
};

const QUIZ_DATA_EN = {
    office: {
        name: "Office & Gaming Station",
        description: "Questions about posture, cables, and what to do when your PC decides to fry itself. Seriously.",
        questions: [
            { question: "What's the correct posture to avoid becoming one with your chair?", answers: ["Straight back, feet on the ground, screen at eye level", "The shrimp position to maximize concentration", "Lying down on the chair, because comfort is everything", "Using a stack of books instead of a chair to stay active"], correct: "Straight back, feet on the ground, screen at eye level" },
            { question: "You see smoke coming from a power strip. Your first move?", answers: ["Cut the main power, if it's safe to do so", "Throw coffee on it to combine two problems into one", "Yell 'FIRE!' and start filming for social media", "Gently blow on it like it's a birthday candle"], correct: "Cut the main power, if it's safe to do so" },
            { question: "How often should you take a break from the monitor to avoid laser eyes?", answers: ["Every 20-30 minutes, looking at a distant point", "Never, breaks are for the weak", "Only when you start seeing pixels in real life", "Every time you lose at Fortnite"], correct: "Every 20-30 minutes, looking at a distant point" },
            { question: "A power cable is frayed. What do you do?", answers: ["Stop using it, report it, and ask for a replacement", "Fix it with colorful duct tape for a touch of style", "Ignore it, as long as it works, there's no problem", "Use it to tie your plants to the desk"], correct: "Stop using it, report it, and ask for a replacement" },
            { question: "Your office chair is leaking hydraulic oil. What's the priority?", answers: ["Report the problem and don't use it until it's repaired", "Put newspapers under it to protect the floor", "Keep using it, oil is good for the floor anyway", "Sell the chair on eBay as 'vintage with patina'"], correct: "Report the problem and don't use it until it's repaired" },
            { question: "The wireless mouse doesn't work anymore. First thing to check?", answers: ["Dead batteries or wireless connection", "If someone stole the cursor", "If the mouse is on vacation mode", "If the mouse needs coffee too"], correct: "Dead batteries or wireless connection" },
            { question: "You work 8+ hours on the computer. How do you protect your vision?", answers: ["Break every 20 min, adjust brightness and use blue light filter", "Squint your eyes hard to train them", "Look at the sun to balance the blue light", "Buy pilot sunglasses"], correct: "Break every 20 min, adjust brightness and use blue light filter" },
            { question: "The desk is too high or too low. What do you do?", answers: ["Adjust chair height or use a footrest", "Grow or shrink accordingly", "Work on your knees or on tiptoes", "Convince the desk to change its mind"], correct: "Adjust chair height or use a footrest" }
        ]
    },
    construction: {
        name: "Hardcore Construction Site",
        description: "Quiz about helmets, scaffolding, and how not to become a cartoon character falling from a great height.",
        questions: [
            { question: "What is essential to wear on a site with a risk of falling objects?", answers: ["A safety helmet", "A straw hat for the sun", "Headphones with loud music for motivation", "A colorful wig to brighten up the place"], correct: "A safety helmet" },
            { question: "What does a red and white striped tape indicate?", answers: ["A hazard area or a temporary worksite", "The starting line for a wheelbarrow race", "A decoration for the construction site party", "The spot where you order pizza"], correct: "A hazard area or a temporary worksite" },
            { question: "Before using scaffolding, what must you absolutely check?", answers: ["That it's stable, complete, and authorized for use", "That it has a good panoramic view for photos", "If your name is written somewhere on it", "If there are any exotic bird nests"], correct: "That it's stable, complete, and authorized for use" },
            { question: "What should you NOT do near a moving crane?", answers: ["Walk under the suspended load", "Wave at the operator", "Wear safety shoes", "Ask if it can give you a lift to the bar"], correct: "Walk under the suspended load" },
            { question: "Safety shoes must have:", answers: ["Reinforced toe, anti-slip sole and ankle protection", "Colorful laces to stand out from the crowd", "LED lights for night work", "A secret compartment for snacks"], correct: "Reinforced toe, anti-slip sole and ankle protection" },
            { question: "You see a colleague working without a helmet. What do you do?", answers: ["Warn them of the danger and report if necessary", "Throw your helmet at them like a frisbee", "Start whistling the Superman theme", "Pretend not to see, every man for himself"], correct: "Warn them of the danger and report if necessary" },
            { question: "Before entering a deep excavation you must verify:", answers: ["Wall stability, presence of gases and escape routes", "If there are buried treasures", "The WiFi signal for social media updates", "If the hole is Instagram-worthy"], correct: "Wall stability, presence of gases and escape routes" },
            { question: "The sign with the exclamation mark indicates:", answers: ["Generic danger, be careful", "That someone is very surprised", "The next bus stop", "The coffee break point"], correct: "Generic danger, be careful" }
        ]
    },
    lab: {
        name: "Mad Scientist's Lab",
        description: "Chemical hazards, mysterious substances, and how not to blow up the building. Almost.",
        questions: [
            { question: "How do you dilute a concentrated acid with water?", answers: ["By pouring the acid into the water, slowly", "By pouring the water into the acid, very quickly", "By mixing them in a blender for a smooth blend", "By asking your nicest colleague to do it for you"], correct: "By pouring the acid into the water, slowly" },
            { question: "What does the skull symbol on a bottle indicate?", answers: ["Acute toxicity, stuff that is very harmful", "That there's a pirate potion inside", "Product made with 'scary' ingredients", "That it's poison for your mother-in-law"], correct: "Acute toxicity, stuff that is very harmful" },
            { question: "Which PPE is vital when handling volatile toxic substances?", answers: ["Working under a fume hood", "Holding your breath for a very long time", "A glittery fabric mask", "Opening the window and hoping the wind is in your favor"], correct: "Working under a fume hood" },
            { question: "A chemical splashes into your eyes. First thing to do?", answers: ["Immediately use the eyewash station for at least 15 minutes", "Rub your eyes hard to get it out", "Put two cucumber slices on for a beauty treatment", "Shout 'I HAVE SUPERPOWERS NOW!'"], correct: "Immediately use the eyewash station for at least 15 minutes" },
            { question: "The safety data sheet (SDS) of a chemical product is used to:", answers: ["Know the risks, precautions and first aid", "Have something to read during the break", "Decorate the lab with important documents", "Make strong paper airplanes"], correct: "Know the risks, precautions and first aid" },
            { question: "Latex gloves should be used with:", answers: ["Non-aggressive substances, but NOT with organic solvents", "Anything, they're magical", "Only for making soap bubbles", "Exclusively to look professional"], correct: "Non-aggressive substances, but NOT with organic solvents" },
            { question: "You smell an unknown substance to identify it. This is:", answers: ["EXTREMELY DANGEROUS! Never smell chemical substances", "The chemical sommelier method", "An ancestral laboratory technique", "A way to develop super smell"], correct: "EXTREMELY DANGEROUS! Never smell chemical substances" },
            { question: "The laboratory fridge can contain:", answers: ["Only chemical reagents, NEVER food or drinks", "Emergency snacks for long nights", "The professor's lunch (at their own risk)", "Beers to celebrate successful experiments"], correct: "Only chemical reagents, NEVER food or drinks" }
        ]
    },
    home: {
        name: "Home Sweet Home (?)",
        description: "Kitchen fires, treacherous electrical outlets, and why you shouldn't clean the floor with gasoline.",
        questions: [
            { question: "If a pot of oil catches fire in the kitchen, what do you do?", answers: ["Smother the flames with a lid or a damp cloth", "Throw water on it to see the volcano effect", "Start making popcorn with it", "Carry it around the house shouting 'IT'S THE SACRED FLAME!'"], correct: "Smother the flames with a lid or a damp cloth" },
            { question: "You're using a hairdryer and it falls into a full bathtub. What do you do?", answers: ["DO NOT touch it and immediately cut the main power", "Quickly retrieve it, the 5-second rule also applies to electricity", "Dive in to save it, it's your favorite hairdryer", "Start talking to the fish that now live in your tub"], correct: "DO NOT touch it and immediately cut the main power" },
            { question: "You smell gas at home. First action to take?", answers: ["Open windows immediately, don't turn on lights, and shut off the gas valve", "Light a scented candle to cover the smell", "Start looking for the leak with a lighter", "Blame the dog and order a pizza"], correct: "Open windows immediately, don't turn on lights, and shut off the gas valve" },
            { question: "You see a blackened electrical outlet. What does it mean?", answers: ["There's an overload or short circuit, it needs to be checked immediately", "It's a new 'dark mode' design for the house", "Someone tried to charge a toaster in it upside down", "The outlet is sad and needs to be comforted"], correct: "There's an overload or short circuit, it needs to be checked immediately" },
            { question: "Detergent got mixed with bleach. What happens?", answers: ["Dangerous toxic gases are created, get out and ventilate immediately", "The supreme detergent for cleaning is born", "The floor becomes self-washing", "You get free teeth whitener"], correct: "Dangerous toxic gases are created, get out and ventilate immediately" },
            { question: "You have a water leak from the ceiling. First thing to do?", answers: ["Turn off the main water supply and call a plumber", "Put buckets everywhere and turn the house into an aquarium", "Ignore it, maybe it'll fix itself", "Sell the house as 'with special effects included'"], correct: "Turn off the main water supply and call a plumber" },
            { question: "The smoke detector keeps going off. What should you NOT do?", answers: ["Remove the batteries to make it stop", "Check if there's actually smoke", "Leave the house if necessary", "Call the fire department if in doubt"], correct: "Remove the batteries to make it stop" },
            { question: "You use a ladder to change a light bulb. Golden rule?", answers: ["Always have someone hold the ladder, never alone", "The higher it is, the more fun it becomes", "Use it as a trampoline for acrobatic work", "The faster you climb, the sooner you finish"], correct: "Always have someone hold the ladder, never alone" }
        ]
    }
};

// Mappa le categorie ai nomi con emoji
function getCategoryDisplayName(categoryKey, language) {
    const categoryNames = {
        it: {
            office: "🏢 Ufficio",
            construction: "🚧 Cantiere", 
            laboratory: "🧪 Laboratorio",
            home: "🏠 Casa"
        },
        en: {
            office: "🏢 Office",
            construction: "🚧 Construction Site",
            laboratory: "🧪 Laboratory", 
            home: "🏠 Home"
        }
    };
    return categoryNames[language][categoryKey] || categoryKey;
}

const uiStrings = {
    it: {
        mainTitle: "Safety Challenge",
        welcomeSubtitle: "Quiz sulla Sicurezza",
        welcomeText: "Mettiti alla prova con 4 domande casuali da diverse categorie di sicurezza. Dimostra di non essere un pericolo per te e per gli altri... 😅",
        startQuizButton: "🚀 Inizia il Quiz",
        introText: "Seleziona una categoria e mettiti alla prova. Dimostra di non essere un pericolo per te e per gli altri... 😅",
        startQuiz: "Inizia la sfida!",
        questionProgress: (current, total) => `Domanda ${current} di ${total}`,
        previous: "Precedente",
        next: "Successiva",
        finishQuiz: "Termina e vedi i risultati",
        resultsFor: (category) => `Risultati per: ${category}`,
        score: "Punteggio:",
        resultMessages: {
            low: "OPS... 😅 Forse è il caso di iscriverti al corso di laurea TEPAL. Fidati, è per il bene di tutti.",
            medium: "Non male! 🔥 Te la cavi, ma puoi sempre migliorare. Dai un'occhiata aL corsO TEPAL Univaq!",
            high: "BELLA BRO! 👑 Sei un professionista. Laurea ad honorem in sicurezza per te!"
        },
        playAgain: "Scegli un'altra sfida",
        backToHome: "🏠 Home"
    },
    en: {
        mainTitle: "Safety Challenge",
        welcomeSubtitle: "Safety Quiz",
        welcomeText: "Test yourself with 4 random questions from different safety categories. Prove you're not a danger to yourself and others... 😅",
        startQuizButton: "🚀 Start Quiz",
        introText: "Select a category and test yourself. Prove you're not a danger to yourself and others... 😅",
        startQuiz: "Start the challenge!",
        questionProgress: (current, total) => `Question ${current} of ${total}`,
        previous: "Previous",
        next: "Next",
        finishQuiz: "Finish & See Results",
        resultsFor: (category) => `Results for: ${category}`,
        score: "Score:",
        resultMessages: {
            low: "OOPS... 😅 Maybe you should enroll in the TEPAL degree program. Trust us, it's for everyone's sake.",
            medium: "Not bad! 🔥 You know your stuff, but you can always improve. Check out the Univaq TEPAL course!",
            high: "NICE ONE, BRO! 👑 You're a pro. Honorary degree in safety for you!"
        },
        playAgain: "Choose another challenge",
        backToHome: "🏠 Home"
    }
};

const appContainer = document.getElementById('app');
const footerContainer = document.getElementById('footer-container');

function render() {
    appContainer.innerHTML = '';
    footerContainer.innerHTML = '';
    appContainer.style.animation = 'none';
    void appContainer.offsetWidth; 
    appContainer.style.animation = 'fadeIn 0.5s ease-out';

    switch (state.currentScreen) {
        case 'welcome':
            renderWelcome();
            break;
        case 'categorySelection':
            renderCategorySelection();
            break;
        case 'quiz':
            renderQuiz();
            break;
        case 'results':
            renderResults();
            break;
    }
    renderFooter();
}

function renderWelcome() {
    const strings = uiStrings[state.language];

    appContainer.innerHTML = `
        <div class="header-with-lang">
            <div class="logo-container">
                <img src="./LOGO-Universita-degli-Studi-dellAquila.png" alt="Università degli Studi dell'Aquila" class="logo-img">
            </div>
            <div class="lang-switcher-header">
                <button id="lang-it" class="lang-btn ${state.language === 'it' ? 'active' : ''}">🇮🇹 IT</button>
                <button id="lang-en" class="lang-btn ${state.language === 'en' ? 'active' : ''}">🇬🇧 EN</button>
            </div>
        </div>
        <div class="welcome-content">
            <h1>${strings.mainTitle}</h1>
            <h2 class="welcome-subtitle">${strings.welcomeSubtitle}</h2>
            <p class="welcome-text">${strings.welcomeText}</p>
            <div class="welcome-actions">
                <button class="action-btn start-quiz-btn" id="start-quiz-btn">${strings.startQuizButton}</button>
            </div>
            <div class="pdf-section">
                <button class="pdf-btn" onclick="window.open('tepal_simple.html?lang=${state.language}&from=app', '_blank')">
                    📄 ${state.language === 'it' ? 'Scarica Brochure TEPAL' : 'Download TEPAL Brochure'}
                </button>
            </div>
        </div>
    `;

    // Event listeners
    document.getElementById('start-quiz-btn').addEventListener('click', () => {
        createMixedQuiz();
        render();
    });

    document.getElementById('lang-it').addEventListener('click', () => handleLangChange('it'));
    document.getElementById('lang-en').addEventListener('click', () => handleLangChange('en'));
}

function renderCategorySelection() {
    const data = state.language === 'it' ? QUIZ_DATA_IT : QUIZ_DATA_EN;
    const strings = uiStrings[state.language];

    let categoryCards = '';
    for (const key in data) {
        categoryCards += `
            <div class="category-card" data-key="${key}">
                <div>
                    <h3>${data[key].name}</h3>
                    <p>${data[key].description}</p>
                </div>
                <button class="action-btn btn-start">${strings.startQuiz}</button>
            </div>
        `;
    }

    appContainer.innerHTML = `
        <div class="header-with-lang">
            <div class="logo-container">
                <img src="./LOGO-Universita-degli-Studi-dellAquila.png" alt="Università degli Studi dell'Aquila" class="logo-img">
            </div>
            <div class="lang-switcher-header">
                <button id="lang-it" class="lang-btn ${state.language === 'it' ? 'active' : ''}">🇮🇹 IT</button>
                <button id="lang-en" class="lang-btn ${state.language === 'en' ? 'active' : ''}">🇬🇧 EN</button>
            </div>
        </div>
        <h1>${strings.mainTitle}</h1>
        <p class="intro-text">${strings.introText}</p>
        <div class="categories-container">
            ${categoryCards}
        </div>
        <div class="pdf-section">
            <button class="pdf-btn" onclick="window.open('tepal_simple.html?lang=${state.language}&from=app', '_blank')">
                📄 ${state.language === 'it' ? 'Scarica Brochure TEPAL' : 'Download TEPAL Brochure'}
            </button>
        </div>
    `;

    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
             if (e.target.classList.contains('btn-start') || e.target.closest('.category-card')) {
                handleCategorySelect(card.dataset.key);
            }
        });
    });

    // Aggiungi event listeners per la lingua
    document.getElementById('lang-it').addEventListener('click', () => handleLangChange('it'));
    document.getElementById('lang-en').addEventListener('click', () => handleLangChange('en'));
}

function renderQuiz() {
    const strings = uiStrings[state.language];
    const question = state.questions[state.currentQuestionIndex];
    
    const progressPercentage = ((state.currentQuestionIndex + 1) / state.questions.length) * 100;

    let answersHTML = '';
    question.answers.forEach((answer) => {
        const isSelected = state.userAnswers[state.currentQuestionIndex] === answer;
        answersHTML += `<button class="btn answer-btn ${isSelected ? 'selected' : ''}" data-answer="${answer}">${answer}</button>`;
    });
    
    const isFirstQuestion = state.currentQuestionIndex === 0;
    const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;

    appContainer.innerHTML = `
        <div class="quiz-header-with-lang">
            <div class="quiz-header">
                <p>${strings.questionProgress(state.currentQuestionIndex + 1, state.questions.length)}</p>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                </div>
            </div>
            <div class="quiz-controls">
                <button id="home-btn" class="home-btn">${strings.backToHome}</button>
                <button id="pdf-btn-quiz" class="pdf-btn-small">📄</button>
                <div class="lang-switcher-header">
                    <button id="lang-it" class="lang-btn ${state.language === 'it' ? 'active' : ''}">🇮🇹</button>
                    <button id="lang-en" class="lang-btn ${state.language === 'en' ? 'active' : ''}">🇬🇧</button>
                </div>
            </div>
        </div>
        <div class="question-info">
            <span class="category-badge">${getCategoryDisplayName(question.category, state.language)}</span>
        </div>
        <h2>${question.question}</h2>
        <div class="answers-grid">
            ${answersHTML}
        </div>
        <div class="navigation-container">
            <button class="action-btn" id="prev-btn" ${isFirstQuestion ? 'disabled' : ''}>${strings.previous}</button>
            <button class="action-btn" id="next-btn">${isLastQuestion ? strings.finishQuiz : strings.next}</button>
        </div>
    `;

    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', () => handleAnswerSelect(btn.dataset.answer));
    });

    document.getElementById('prev-btn').addEventListener('click', () => handleNav('prev'));
    document.getElementById('next-btn').addEventListener('click', () => handleNav('next'));
    document.getElementById('home-btn').addEventListener('click', () => handleBackToHome());
    document.getElementById('pdf-btn-quiz').addEventListener('click', () => {
        window.open(`tepal_simple.html?lang=${state.language}&from=app`, '_blank');
    });
    
    // Aggiungi event listeners per la lingua
    document.getElementById('lang-it').addEventListener('click', () => handleLangChange('it'));
    document.getElementById('lang-en').addEventListener('click', () => handleLangChange('en'));
}

function renderResults() {
    const strings = uiStrings[state.language];
    
    let message = '';
    const score = state.score;
    
    if (score <= 2) {
        message = strings.resultMessages.low;
    } else if (score === 3) {
        message = strings.resultMessages.medium;
    } else {
        message = strings.resultMessages.high;
    }

    appContainer.innerHTML = `
        <div class="results-screen">
            <div class="results-header-with-lang">
                <button id="home-btn" class="home-btn">${strings.backToHome}</button>
                <button id="pdf-btn-results" class="pdf-btn-small">📄</button>
                <div class="lang-switcher-header">
                    <button id="lang-it" class="lang-btn ${state.language === 'it' ? 'active' : ''}">🇮🇹</button>
                    <button id="lang-en" class="lang-btn ${state.language === 'en' ? 'active' : ''}">🇬🇧</button>
                </div>
            </div>
            <h1>${strings.mixedQuizResults || (state.language === 'it' ? 'Risultati Quiz Sicurezza' : 'Safety Quiz Results')}</h1>
            <p class="result-score">${strings.score} ${state.score} / ${state.questions.length}</p>
            <p class="result-message">${message}</p>
            <button class="action-btn" id="play-again-btn">${strings.playAgain}</button>
        </div>
    `;

    document.getElementById('play-again-btn').addEventListener('click', () => {
        handleBackToHome(); // Riavvia con nuovo quiz misto
    });
    
    document.getElementById('home-btn').addEventListener('click', () => handleBackToHome());
    document.getElementById('pdf-btn-results').addEventListener('click', () => {
        window.open(`tepal_simple.html?lang=${state.language}&from=app`, '_blank');
    });
    
    // Aggiungi event listeners per la lingua
    document.getElementById('lang-it').addEventListener('click', () => handleLangChange('it'));
    document.getElementById('lang-en').addEventListener('click', () => handleLangChange('en'));
}

function renderFooter() {
     footerContainer.innerHTML = `
        <p>&copy; 2024 Università degli Studi dell'Aquila</p>
    `;
}

// Funzione per creare un quiz misto con 4 domande casuali da tutte le categorie
function createMixedQuiz() {
    const data = state.language === 'it' ? QUIZ_DATA_IT : QUIZ_DATA_EN;
    
    // Raccoglie tutte le domande da tutte le categorie
    const allQuestions = [];
    Object.keys(data).forEach(categoryKey => {
        data[categoryKey].questions.forEach(question => {
            allQuestions.push({
                ...question,
                category: categoryKey  // Usa la chiave invece del nome
            });
        });
    });
    
    // Seleziona 4 domande casuali dal pool totale
    const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
    state.questions = shuffledQuestions.slice(0, 4);
    
    // Mescola le risposte per ogni domanda selezionata
    state.questions.forEach(q => q.answers.sort(() => 0.5 - Math.random()));

    state.currentQuestionIndex = 0;
    state.userAnswers = new Array(state.questions.length).fill(null);
    state.score = 0;
    state.currentScreen = 'quiz';
}

function handleCategorySelect(key) {
    state.currentCategoryKey = key;
    const data = state.language === 'it' ? QUIZ_DATA_IT : QUIZ_DATA_EN;
    
    // Seleziona 4 domande casuali dal pool della categoria
    const allQuestions = [...data[key].questions];
    const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
    state.questions = shuffledQuestions.slice(0, 4);
    
    // Mescola le risposte per ogni domanda selezionata
    state.questions.forEach(q => q.answers.sort(() => 0.5 - Math.random()));

    state.currentQuestionIndex = 0;
    state.userAnswers = new Array(state.questions.length).fill(null);
    state.score = 0;
    state.currentScreen = 'quiz';
    render();
}

function handleAnswerSelect(answer) {
    state.userAnswers[state.currentQuestionIndex] = answer;
    renderQuiz();
}

function handleNav(direction) {
    if (direction === 'prev' && state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
        renderQuiz();
    } else if (direction === 'next') {
        if (state.currentQuestionIndex < state.questions.length - 1) {
            state.currentQuestionIndex++;
            renderQuiz();
        } else {
            calculateScore();
            state.currentScreen = 'results';
            render();
        }
    }
}

function calculateScore() {
    let score = 0;
    state.questions.forEach((question, index) => {
        if (question.correct === state.userAnswers[index]) {
            score++;
        }
    });
    state.score = score;
}

function handleLangChange(lang) {
    if (state.language !== lang) {
        state.language = lang;
        
        // Se siamo in un quiz attivo, ricarica i dati nella nuova lingua
        if (state.currentScreen === 'quiz' && state.currentCategoryKey) {
            const data = state.language === 'it' ? QUIZ_DATA_IT : QUIZ_DATA_EN;
            const newQuestions = [...data[state.currentCategoryKey].questions];
            
            // Mantieni le risposte già date per le domande già viste
            newQuestions.forEach((q, index) => {
                if (index < state.questions.length) {
                    q.answers.sort(() => 0.5 - Math.random());
                }
            });
            
            state.questions = newQuestions;
        }
        
        render();
    }
}

function handleBackToHome() {
    // Torna alla schermata di benvenuto
    state.currentScreen = 'welcome';
    state.questions = [];
    state.currentQuestionIndex = 0;
    state.userAnswers = [];
    state.score = 0;
    render();
}

function init() {
    // Inizia con la schermata di benvenuto
    render();
}

document.addEventListener('DOMContentLoaded', init);
