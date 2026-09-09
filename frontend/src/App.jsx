import { useState } from 'react'
import './App.css'

const topics = [
  { id: 'luonto', label: 'Luonto', icon: '◒', color: 'sage', count: '8 tehtävää' },
  { id: 'keho', label: 'Ihminen ja terveys', icon: '♡', color: 'coral', count: '8 tehtävää' },
  { id: 'avaruus', label: 'Avaruus', icon: '✦', color: 'blue', count: '8 tehtävää' },
  { id: 'energia', label: 'Energia ja aine', icon: 'ϟ', color: 'yellow', count: '8 tehtävää' },
  { id: 'saa', label: 'Sää ja kartat', icon: '⌁', color: 'sky', count: '9 tehtävää' },
  { id: 'kestava', label: 'Kestävä kehitys', icon: '♧', color: 'mint', count: '9 tehtävää' },
]

const questions = [
  { topic: 'luonto', question: 'Mikä näistä on nisäkäs?', detail: 'Nisäkkäät imettävät poikasiaan maidolla.', options: ['Sammakko', 'Orava', 'Perhonen', 'Ahven'], answer: 'Orava' },
  { topic: 'luonto', question: 'Mitä kasvi tarvitsee yhteyttämiseen?', detail: 'Kasvi valmistaa valon avulla itselleen ravintoa.', options: ['Auringonvaloa', 'Pimeyttä', 'Hiekkaa', 'Suolavettä'], answer: 'Auringonvaloa' },
  { topic: 'luonto', question: 'Mitkä eläimet talvehtivat Suomessa?', detail: 'Karhu, hirvi ja kettu selviävät Suomen talvesta. Pääskynen muuttaa talveksi etelään.', options: ['Karhu', 'Pääskynen', 'Hirvi', 'Kettu'], answers: ['Karhu', 'Hirvi', 'Kettu'] },
  { topic: 'luonto', question: 'Mikä on puun runko?', detail: 'Runko kannattelee oksia ja kuljettaa vettä juurista lehtiin.', options: ['Puun keskiosa', 'Puun kukka', 'Puun siemen', 'Puun juuri'], answer: 'Puun keskiosa' },
  { topic: 'luonto', question: 'Miten siemen leviää uuden paikan löytämiseksi?', detail: 'Siemen voi kulkeutua esimerkiksi tuulen, veden tai eläimen mukana.', options: ['Leviämällä', 'Sulamalla', 'Hengittämällä', 'Nukkumalla'], answer: 'Leviämällä' },
  { topic: 'luonto', question: 'Mikä näistä on hyönteinen?', detail: 'Hyönteisellä on kuusi jalkaa.', options: ['Hämähäkki', 'Muurahainen', 'Mato', 'Etana'], answer: 'Muurahainen' },
  { topic: 'luonto', question: 'Miksi luonnon monimuotoisuus on tärkeää?', detail: 'Monimuotoinen luonto auttaa eliöitä ja ekosysteemejä selviytymään muutoksista.', options: ['Lajeja ja elinympäristöjä on paljon', 'Kaikki eläimet ovat samanlaisia', 'Luonnossa ei ole kasveja', 'Sää ei muutu koskaan'], answer: 'Lajeja ja elinympäristöjä on paljon' },
  { topic: 'luonto', question: 'Mitä eläimet tarvitsevat elääkseen?', detail: 'Kaikki eläimet tarvitsevat esimerkiksi ravintoa, vettä, happea ja sopivan elinympäristön.', options: ['Vain auringonvaloa', 'Ravintoa ja vettä', 'Vain lunta', 'Vain suolaa'], answer: 'Ravintoa ja vettä' },
  { topic: 'keho', question: 'Mikä elin pumppaa verta ympäri kehoa?', detail: 'Se on noin nyrkin kokoinen lihas rintakehässä.', options: ['Keuhkot', 'Aivot', 'Sydän', 'Vatsa'], answer: 'Sydän' },
  { topic: 'keho', question: 'Mikä tehtävä keuhkoilla on?', detail: 'Keuhkoissa veri saa hengitysilmasta happea.', options: ['Ne sulattavat ruoan', 'Ne vaihtavat happea ja hiilidioksidia', 'Ne pumppaavat verta', 'Ne liikuttavat luita'], answer: 'Ne vaihtavat happea ja hiilidioksidia' },
  { topic: 'keho', question: 'Miksi kädet pestään saippualla?', detail: 'Saippua irrottaa käsistä likaa ja taudinaiheuttajia.', options: ['Käsien viilentämiseksi', 'Lian ja mikrobien poistamiseksi', 'Kynsien kasvattamiseksi', 'Ihon värin muuttamiseksi'], answer: 'Lian ja mikrobien poistamiseksi' },
  { topic: 'keho', question: 'Mikä auttaa luustoa pysymään vahvana?', detail: 'Monipuolinen ruoka ja liikkuminen tukevat luuston terveyttä.', options: ['Liikkuminen ja monipuolinen ruoka', 'Valvominen', 'Vain makeiset', 'Paikallaan istuminen'], answer: 'Liikkuminen ja monipuolinen ruoka' },
  { topic: 'keho', question: 'Mitä aivot ohjaavat?', detail: 'Aivot käsittelevät tietoa ja ohjaavat kehon toimintoja.', options: ['Vain hiusten kasvua', 'Ajattelua ja kehon toimintaa', 'Vain kynsien pituutta', 'Auringon liikettä'], answer: 'Ajattelua ja kehon toimintaa' },
  { topic: 'keho', question: 'Miksi uni on tärkeää?', detail: 'Unen aikana keho ja aivot palautuvat päivän rasituksesta.', options: ['Keho palautuu', 'Nälkä kasvaa aina', 'Lihakset katoavat', 'Emme tarvitse vettä'], answer: 'Keho palautuu' },
  { topic: 'keho', question: 'Mitä ruoka-aineet antavat keholle?', detail: 'Ruoka antaa keholle energiaa ja rakennusaineita.', options: ['Vain väriä', 'Energiaa ja rakennusaineita', 'Vain ääntä', 'Sateenvarjon'], answer: 'Energiaa ja rakennusaineita' },
  { topic: 'keho', question: 'Mikä suojaa kehoa ulkopuolelta?', detail: 'Iho suojaa kehoa ja auttaa aistimaan ympäristöä.', options: ['Iho', 'Luu', 'Sydän', 'Vatsa'], answer: 'Iho' },
  { topic: 'avaruus', question: 'Mikä on oma tähtemme?', detail: 'Se antaa meille valoa ja lämpöä joka päivä.', options: ['Kuu', 'Aurinko', 'Mars', 'Jupiter'], answer: 'Aurinko' },
  { topic: 'avaruus', question: 'Mikä kiertää Maata?', detail: 'Kuu on Maan luonnollinen satelliitti.', options: ['Kuu', 'Aurinko', 'Venus', 'Pohjantähti'], answer: 'Kuu' },
  { topic: 'avaruus', question: 'Mikä planeetta tunnetaan punaisena planeettana?', detail: 'Marsin pinnan rautaoksidi antaa sille punertavan värin.', options: ['Mars', 'Neptunus', 'Merkurius', 'Saturnus'], answer: 'Mars' },
  { topic: 'avaruus', question: 'Miksi Maassa on päivä ja yö?', detail: 'Maa pyörii akselinsa ympäri.', options: ['Maa pyörii', 'Kuu syttyy', 'Aurinko sammuu', 'Pilvet liikkuvat'], answer: 'Maa pyörii' },
  { topic: 'avaruus', question: 'Mikä on planeetta?', detail: 'Planeetta kiertää tähteä ja on muodoltaan lähes pyöreä.', options: ['Taivaankappale, joka kiertää tähteä', 'Pilvi avaruudessa', 'Avaruuspuku', 'Aina palava kivi'], answer: 'Taivaankappale, joka kiertää tähteä' },
  { topic: 'avaruus', question: 'Miksi astronautti tarvitsee avaruuspuvun?', detail: 'Avaruuspuvun avulla astronautti saa happea ja suojaa kylmyydeltä.', options: ['Hapen ja suojan vuoksi', 'Uimista varten', 'Maan painovoiman lisäämiseksi', 'Pimeyden poistamiseksi'], answer: 'Hapen ja suojan vuoksi' },
  { topic: 'avaruus', question: 'Mikä on Linnunrata?', detail: 'Linnunrata on galaksi, jossa oma aurinkokuntamme sijaitsee.', options: ['Galaksi', 'Planeetta', 'Kuu', 'Avaruuspuku'], answer: 'Galaksi' },
  { topic: 'avaruus', question: 'Miksi Kuu näyttää eri muotoiselta eri öinä?', detail: 'Näemme eri määrän Auringon valaisemaa Kuun puolta.', options: ['Kuun vaiheet vaihtuvat', 'Kuu kasvaa ja pienenee', 'Kuu sammuu', 'Pilvet tekevät Kuun'], answer: 'Kuun vaiheet vaihtuvat' },
  { topic: 'energia', question: 'Miksi jää sulaa huoneenlämmössä?', detail: 'Lämpö siirtyy lämpimästä ympäristöstä jäähän.', options: ['Se saa lämpöä', 'Se muuttuu ilmaksi', 'Se saa valoa', 'Se jäähtyy'], answer: 'Se saa lämpöä' },
  { topic: 'energia', question: 'Mikä on sähkön turvallinen käyttötapa?', detail: 'Sähkölaitteita käytetään kuivilla käsillä ja ehjinä.', options: ['Sähkölaitteen käyttäminen vedessä', 'Johdon rikkominen', 'Kuivien käsien käyttäminen', 'Pistorasian koskeminen metallilla'], answer: 'Kuivien käsien käyttäminen' },
  { topic: 'energia', question: 'Mistä aurinkopaneeli saa energiaa?', detail: 'Aurinkopaneeli muuttaa Auringon säteilyä sähköenergiaksi.', options: ['Auringon säteilystä', 'Lumesta', 'Kuun varjosta', 'Hiekasta'], answer: 'Auringon säteilystä' },
  { topic: 'energia', question: 'Mikä aine on kaasuna huoneenlämmössä?', detail: 'Vesihöyry on vettä kaasumaisessa olomuodossa.', options: ['Jää', 'Vesihöyry', 'Kivi', 'Lasi'], answer: 'Vesihöyry' },
  { topic: 'energia', question: 'Mitä lämpömittari mittaa?', detail: 'Lämpömittari kertoo, kuinka lämmintä tai kylmää on.', options: ['Lämpötilaa', 'Tuulen nopeutta', 'Pituutta', 'Painoa'], answer: 'Lämpötilaa' },
  { topic: 'energia', question: 'Miten ääni syntyy?', detail: 'Ääni syntyy värähtelystä ja etenee esimerkiksi ilman välityksellä.', options: ['Värähtelystä', 'Pimeydestä', 'Veden jäätymisestä', 'Vain valosta'], answer: 'Värähtelystä' },
  { topic: 'energia', question: 'Miksi tumma paita lämpenee auringossa?', detail: 'Tumma pinta imee enemmän auringon säteilyä kuin vaalea pinta.', options: ['Se imee säteilyä', 'Se tuottaa lunta', 'Se heijastaa kaiken valon', 'Se jäähtyy nopeammin'], answer: 'Se imee säteilyä' },
  { topic: 'energia', question: 'Mikä on uusiutuva energialähde?', detail: 'Tuuli on uusiutuva energialähde, koska sitä syntyy luonnossa jatkuvasti.', options: ['Kivihiili', 'Öljy', 'Tuuli', 'Turve'], answer: 'Tuuli' },
  { topic: 'saa', question: 'Mitä sääennuste kertoo?', detail: 'Sääennuste kertoo tulevasta säästä, kuten lämpötilasta ja sateesta.', options: ['Tulevasta säästä', 'Maan iästä', 'Eläinten nimistä', 'Karttojen väreistä'], answer: 'Tulevasta säästä' },
  { topic: 'saa', question: 'Mikä laite mittaa lämpötilaa?', detail: 'Lämpömittarilla mitataan ilman tai muun aineen lämpötilaa.', options: ['Kompassi', 'Lämpömittari', 'Viivoitin', 'Kello'], answer: 'Lämpömittari' },
  { topic: 'saa', question: 'Mistä sade syntyy?', detail: 'Pilvien vesipisarat kasvavat ja putoavat lopulta sateena.', options: ['Pilvien vesipisaroista', 'Auringon säteistä', 'Kivistä', 'Tuulen äänestä'], answer: 'Pilvien vesipisaroista' },
  { topic: 'saa', question: 'Mihin kompassia käytetään?', detail: 'Kompassi auttaa löytämään ilmansuunnat.', options: ['Ilmansuuntien löytämiseen', 'Lämpötilan mittaamiseen', 'Sateen tekemiseen', 'Etäisyyden punnitsemiseen'], answer: 'Ilmansuuntien löytämiseen' },
  { topic: 'saa', question: 'Mikä on kartan mittakaava?', detail: 'Mittakaava kertoo, kuinka paljon kartan etäisyydet ovat pienennettyjä.', options: ['Kartalla olevan etäisyyden suhde oikeaan etäisyyteen', 'Karttapaperin paino', 'Sään nopeus', 'Paikan korkeus aina'], answer: 'Kartalla olevan etäisyyden suhde oikeaan etäisyyteen' },
  { topic: 'saa', question: 'Mikä ilmansuunta on auringonnousun suunta?', detail: 'Aurinko nousee idästä ja laskee länteen.', options: ['Itä', 'Länsi', 'Etelä', 'Pohjoinen'], answer: 'Itä' },
  { topic: 'saa', question: 'Mikä aiheuttaa tuulen?', detail: 'Tuuli syntyy ilman liikkeestä, jota lämpötilaerot voivat aiheuttaa.', options: ['Ilman liike', 'Kuun valo', 'Maan väri', 'Lumen paino'], answer: 'Ilman liike' },
  { topic: 'saa', question: 'Mikä on vuodenaika Suomessa joulukuussa?', detail: 'Joulukuu kuuluu Suomessa talveen.', options: ['Kevät', 'Kesä', 'Syksy', 'Talvi'], answer: 'Talvi' },
  { topic: 'saa', question: 'Miksi kartassa on selite?', detail: 'Selite kertoo kartan merkkien ja värien tarkoitukset.', options: ['Merkkien selittämiseksi', 'Karttaa koristamaan', 'Sään muuttamiseksi', 'Kartan painon mittaamiseksi'], answer: 'Merkkien selittämiseksi' },
  { topic: 'kestava', question: 'Mihin biojäte lajitellaan?', detail: 'Biojäte sisältää eloperäistä jätettä, joka voidaan hyödyntää uudelleen.', options: ['Biojäteastiaan', 'Lasinkeräykseen', 'Metallinkeräykseen', 'Sekajätteeseen aina'], answer: 'Biojäteastiaan' },
  { topic: 'kestava', question: 'Miksi tavaroita kannattaa korjata?', detail: 'Korjaamalla tavara saa pidemmän käyttöiän ja jätettä syntyy vähemmän.', options: ['Jätettä syntyy vähemmän', 'Tavara muuttuu ruoaksi', 'Sähköä syntyy aina', 'Tavara katoaa'], answer: 'Jätettä syntyy vähemmän' },
  { topic: 'kestava', question: 'Mikä säästää vettä?', detail: 'Hanan sulkeminen saippuoinnin ajaksi vähentää veden kulutusta.', options: ['Hanan sulkeminen pesun ajaksi', 'Hanan pitäminen auki', 'Veden juoksuttaminen turhaan', 'Pitkä suihku joka päivä'], answer: 'Hanan sulkeminen pesun ajaksi' },
  { topic: 'kestava', question: 'Mikä on uusiokäyttöä?', detail: 'Uusiokäytössä esineelle annetaan uusi käyttötarkoitus tai sitä käytetään uudelleen.', options: ['Purkin käyttäminen säilytysastiana', 'Tavaran heittäminen heti pois', 'Ruoan pilaaminen', 'Veden likaaminen'], answer: 'Purkin käyttäminen säilytysastiana' },
  { topic: 'kestava', question: 'Miten koulumatkan voi kulkea ympäristöä säästäen?', detail: 'Kävely ja pyöräily eivät tarvitse polttoainetta eivätkä tuota pakokaasuja.', options: ['Kävellen tai pyörällä', 'Aina yksin autolla', 'Moottorikelkalla kesällä', 'Lentokoneella'], answer: 'Kävellen tai pyörällä' },
  { topic: 'kestava', question: 'Miksi metsää tarvitaan?', detail: 'Metsät ovat elinympäristöjä ja sitovat hiilidioksidia.', options: ['Elinympäristöksi ja hiilen sitomiseen', 'Vain parkkipaikoiksi', 'Roskapusseiksi', 'Sään pysäyttämiseksi'], answer: 'Elinympäristöksi ja hiilen sitomiseen' },
  { topic: 'kestava', question: 'Mitä tarkoittaa luonnonvarojen säästäminen?', detail: 'Luonnonvaroja säästyy, kun käytämme materiaaleja harkiten ja vältämme turhaa kulutusta.', options: ['Käytetään materiaaleja harkiten', 'Ostetaan aina uutta', 'Heitetään käyttökelpoinen pois', 'Käytetään vettä turhaan'], answer: 'Käytetään materiaaleja harkiten' },
  { topic: 'kestava', question: 'Miksi ruokaa ei kannata heittää turhaan pois?', detail: 'Ruoan valmistamiseen on käytetty vettä, energiaa ja muita luonnonvaroja.', options: ['Ruoan valmistukseen on käytetty luonnonvaroja', 'Ruoka kasvattaa puita', 'Roska muuttuu aina kullaksi', 'Ruoka ei vaikuta mihinkään'], answer: 'Ruoan valmistukseen on käytetty luonnonvaroja' },
  { topic: 'kestava', question: 'Mikä auttaa eläimiä talvella?', detail: 'Eläimille voi tarjota sopivaa ruokaa, mutta ruokinnassa pitää noudattaa ohjeita.', options: ['Oikein järjestetty ruokinta', 'Muovin levittäminen metsään', 'Roskaaminen', 'Eläinten häiritseminen'], answer: 'Oikein järjestetty ruokinta' },
]

function App() {
  const [selectedTopic, setSelectedTopic] = useState('luonto')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(2)
  const [completed, setCompleted] = useState(12)
  const topicQuestions = questions.filter((question) => question.topic === selectedTopic)
  const question = topicQuestions[questionIndex % topicQuestions.length]
  const topic = topics.find((item) => item.id === selectedTopic)
  const answerChecked = selectedAnswer !== null
  const correctAnswers = question.answers ?? [question.answer]

  function chooseTopic(topicId) { setSelectedTopic(topicId); setQuestionIndex(0); setSelectedAnswer(null) }
  function chooseAnswer(option) {
    if (answerChecked) return
    setSelectedAnswer(option); setCompleted((value) => value + 1)
    if (correctAnswers.includes(option)) { setScore((value) => value + 1); setStreak((value) => value + 1) } else setStreak(0)
  }
  function nextQuestion() { setQuestionIndex((value) => value + 1); setSelectedAnswer(null) }
  function restartBlock() { setQuestionIndex(0); setSelectedAnswer(null) }

  return (
    <div className="app-shell">
      <aside className="sidebar"><div className="brand"><span className="brand-mark">+</span><span>Oppi</span></div><div className="profile-card"><div className="avatar">J</div><div><strong>Joel</strong><span>4. luokka</span></div><button className="more-button" aria-label="Asetukset">•••</button></div><nav className="main-nav" aria-label="Päänavigaatio"><button className="nav-item active"><span>▦</span> Harjoitukset</button><button className="nav-item"><span>⌁</span> Edistyminen</button><button className="nav-item"><span>♧</span> Kokoelmani</button></nav><div className="sidebar-bottom"><div className="daily-note"><span className="note-icon">✦</span><div><strong>Päivän tavoite</strong><span>3 / 5 harjoitusta</span></div></div><div className="goal-track"><span style={{ width: '60%' }} /></div><button className="help-link">? <span>Tarvitsetko apua?</span></button></div></aside>
      <main className="content"><header className="topbar"><div className="breadcrumb">4. LUOKKA <span>/</span> YMPÄRISTÖOPPI</div><button className="icon-button" aria-label="Ilmoitukset">♧<i /></button></header>
        <section className="welcome-row"><div><p className="eyebrow">TIISTAI, 9. SYYSKUUTA</p><h1>Hei Joel, <em>opitaan!</em></h1><p className="intro">Valitse aihe ja lämmittele aivot päivän harjoituksiin.</p></div><div className="streak"><span className="flame">ϟ</span><div><strong>{streak} päivää</strong><span>putki käynnissä</span></div></div></section>
        <section className="topic-section"><div className="section-heading"><div><h2>Aihealueet</h2><p>Mitä tutkitaan tänään?</p></div><button className="text-button">Näytä kaikki <span>→</span></button></div><div className="topic-grid">{topics.map((item) => <button key={item.id} className={`topic-card ${item.color} ${selectedTopic === item.id ? 'selected' : ''}`} onClick={() => chooseTopic(item.id)}><span className="topic-icon">{item.icon}</span><span className="topic-copy"><strong>{item.label}</strong><small>{item.count}</small></span><span className="arrow">↗</span></button>)}</div></section>
        <section className="practice-layout"><div className="practice-card"><div className="practice-top"><div><span className="practice-label">HARJOITUS 01 <b>/</b> {topic.label.toUpperCase()}</span><div className="progress-dots">{[0, 1, 2, 3, 4].map((dot) => <span key={dot} className={dot <= questionIndex % 5 ? 'filled' : ''} />)}</div></div><div className="practice-actions"><span className="points">+10 XP</span><button className="restart-button" onClick={restartBlock} aria-label={`Aloita ${topic.label} -lohko alusta`} title="Aloita lohko alusta">↺ <span>Aloita alusta</span></button></div></div><div className="question-copy"><span className="question-number">KYSYMYS {questionIndex + 1}</span><h2>{question.question}</h2><p>Valitse oikea vaihtoehto.</p></div><div className="answers">{question.options.map((option, index) => { const isCorrect = correctAnswers.includes(option); const isSelected = option === selectedAnswer; return <button key={option} className={`answer ${isSelected ? (isCorrect ? 'correct' : 'wrong') : ''} ${answerChecked && isCorrect ? 'reveal' : ''}`} onClick={() => chooseAnswer(option)}><span className="answer-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>{isSelected && <span className="answer-status">{isCorrect ? '✓' : '×'}</span>}</button> })}</div>{answerChecked && <div className={`feedback ${correctAnswers.includes(selectedAnswer) ? 'good' : 'try-again'}`}><span>{correctAnswers.includes(selectedAnswer) ? '✓' : 'i'}</span><div><strong>{correctAnswers.includes(selectedAnswer) ? 'Hienosti tehty!' : 'Hyvä yritys!'}</strong><p>{correctAnswers.includes(selectedAnswer) ? question.detail : `Oikeita vastauksia ovat ${correctAnswers.join(', ')}. ${question.detail}`}</p></div></div>}<button className="next-button" onClick={nextQuestion} disabled={!answerChecked}>{answerChecked ? 'Seuraava kysymys' : 'Valitse vastaus'} <span>→</span></button></div><aside className="side-stats"><div className="stats-heading"><h3>Omat tilastot</h3><span>tällä viikolla</span></div><div className="score-circle"><div><strong>{Math.round((score / Math.max(completed - 12, 1)) * 100) || 0}<small>%</small></strong><span>oikein</span></div></div><div className="stat-row"><span>Harjoituksia tehty</span><strong>{completed}</strong></div><div className="stat-row"><span>Ansaittu XP</span><strong>{score * 10 + 240}</strong></div><div className="encouragement">Jatka samaan malliin, Joel! <span>✦</span></div></aside></section>
      </main>
    </div>
  )
}

export default App
