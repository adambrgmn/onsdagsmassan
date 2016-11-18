/* eslint-disable no-use-before-define */

import React, { Component } from 'react';
import Link from 'next/link';
import css from 'next/css';
import * as vars from '../styles/variables';
import eventListeners from '../utils/eventListeners';

import Head from '../components/Head';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Section from '../components/Section';
import Footer from '../components/Footer';
import ReadMoreLink from '../components/ReadMoreLink';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { showNav: false };
    this.sectionScrollEvents = [];
  }

  componentDidMount() {
    this.unregisterScroll = eventListeners('scroll', this.runScroll);
  }

  componentWillUnmount() {
    this.unregisterScroll();
  }

  addScrollEvent = (fn) => (this.sectionScrollEvents = [...this.sectionScrollEvents, fn]);
  runScroll = () => this.sectionScrollEvents.forEach(fn => fn());

  onNavClick = (e) => {
    if (e) e.preventDefault();
    this.setState({ showNav: !this.state.showNav });
  }

  render() {
    const sections = [
      {
        title: 'Aktuellt',
        to: 'aktuellt',
        img: '/static/img/akvarell-1.png',
        source: 'Aktuellt conceptam reprimique duo ei, impedit tibique omittantur ne mea, mel stet consectetuer ut. Ut qui ubique definiebas percipitur, fabulas legimus signiferumque duo an. At iisque impedit salutatus cum, pri vidit referrentur eu, quo praesent expetendis interesset eu.\n\nEros sanctus his ex. At liber electram posidonium ius. Te mei dico audire veritus. Nullam sententiae consequuntur est at, his an discere suscipiantur. Stet conceptam reprimique duo ei, impedit tibique omittantur ne mea, mel stet consectetuer ut. Ut qui ubique definiebas percipitur, fabulas legimus signiferumque duo.\n\nAt iisque impedit salutatus cum, pri vidit referrentur eu, quo praesent expetendis interesset eu. Eros sanctus his ex. At liber electram posidonium ius. Te mei dico audire veritus. Nullam sententiae consequuntur est at, his an discere suscipiantur.', // eslint-disable-line max-len
      },
      {
        title: 'Information',
        to: 'information',
        img: '/static/img/akvarell-2.png',
        reverse: true,
        source: 'Allt började när jag stod på en stege ett par meter upp i luften och målade en gavel på mina föräldrars sommarstuga. Som från ingenstans dök en fras upp som satt sig från en predikan någon gång\n\n> »Den kristnes plats har aldrig varit på åskådarplats.«\n\nAtt som jag vara kritisk och ha en massa tankar kring kyrkan är ingen konst, men att försöka göra något konstruktivt är desto svårare. Det är så lätt att hamna där, på åskådarplatsen, och ha en massa synpunkter på vad som är bra och dåligt, vad som funkar och vad som inte funkar, vad som är rätt och vad som är fel.\n\nTankarna där uppe på stegen gick till alla de vänner jag mött de senaste åren som varit med i en kyrka men som lämnat. Hur skulle det vara om jag skapade en gudstjänst för dem, men också för mig själv?\n\nVad skulle finnas med och vad skulle utelämnas i en sådan gudstjänst? Fanns det något som jag skulle kunna stå bakom till hundra procent?\n\nLukten av målarfärg gjorde mig lite yr, men jag gjorde ändå en skiss i huvudet på hur innehållet i en sådan gudstjänst skulle kunna se ut.\n\nJag insåg att det fanns tre saker som behövde finnas med, och runt dem ville jag bygga hela gudstjänsten:\n\n> Nattvard – Kollekt – Kyrkkaffe\n\nNattvarden är en påminnelse om att vi alla, oavsett hur vi har det eller vad vi har gjort, får ta till oss det stora att Jesus trots allt vill ha med oss att göra. Även om vi inte kan förstå det fullt ut, är nattvarden det mest konkreta sättet för oss att ta emot Jesus.\n\nKollekten får oss att tänka på någon annan än oss själva. Det finns något i den ordningen som jag tycker är djupt förankrat i den kristna tron: Först får vi ta emot från Gud och sen får vi ge vidare av det vi har.\n\nGenom kyrkkaffet, i samtalet, får vi möta varandra. Kanske möter vi även Gud där.\n\nDe saker som jag inte tyckte behövdes:\n\n> Predikan – Pålysningar – En scen\n\nPredikan kändes onödigt eftersom de jag hade tänkt bjuda in redan har fått höra så många predikningar att jag är rädd att de inte orkar mer. Och om jag ska vara ärlig så tror jag att de redan kan de mesta predikningarna ändå.\n\nJag ville ge oss något annat.\nNågot som kanske är ännu bättre.\nNågot som verkligen får oss att tänka.\nNågot de kanske inte hört så många gånger tidigare.\nJag ville ge oss tystnaden. En paus från bruset. En stunds reflektion mitt i vardagen.\nPålysningarna var överflödiga eftersom det helt enkelt inte finns något att pålysa. Jag har för övrigt aldrig riktigt förstått det där att man mitt under en gudstjänst bryter av och förstör det lilla mått av koncentration jag lyckats uppbåda, bara för att berätta om vilka samlingar som kommer.\n\nAtt sätta scenen på listan över saker jag inte ville ha med kan kanske tyckas konstigt eftersom så många kyrkor, om än inte alla, har en. Ibland kallar vi den estrad, men oftast används den ändå som scen. Det kan upplevas som att det är en plats för de duktiga, de talangfulla och de som har fått en gåva. Alla får inte plats på en sådan scen. Alla vill heller inte finnas där. Ofta önskar jag att det var de som inte ville stå på scenen som stod där och tvärtom.\n\nJag tror estraden – eller scenen – har förstört många människor i kyrkan. Inte bara bland dem som går upp på estraden utan också bland dem som sitter kvar. Det finns alltid en stor risk för dem som tar steget upp att tappa fotfästet (och här öser jag ur egna källor av erfarenhet). Är man för ung och får för mycket uppmärksamhet är risken överhängande att man tappar bort vem man är. Att man går på myten om sig själv och att själv bli så stor att den Gud man pratar om blir förminskad. (Jag har märkt att det sker mest med manliga predikanter.)\n\nFör dem som sitter kvar i kyrkbänken finns en risk att man börjar tro att den som står på estraden är mer än en människa, att det blir någon som har tolkningsföreträde.\n\nJag målade klart stugan och tog med mig mina tankar hem. Inte långt därefter gick jag förbi en kyrka som jag aldrig lagt märke till tidigare. Den låg undanskymd i en del av Göteborg som jag sällan besökte. Den var gammal och såg inte ut att ha renoverats på länge. Jag tog reda på att detta var engelska kyrkan som kallas St Andrew’s Church, och som tillhör Anglikanska kyrkan i England, för jag tänkte att här inne ska vi ha vår gudstjänst. Jag hade funderat just på var det var bäst att hålla gudstjänsten. Kanske var det bättre med en neutral plats, exempelvis ett kafé eller liknande? En plats som inte är så laddad. Men jag kom ändå fram till att det var bäst att gå till ett ställe som var avskilt just för ett möte mellan Gud och människor. Jag tror att alla, oavsett om man kallar sig troende eller inte, har ett rum i hjärtat som är tänkt för det vi kallar helighet. Därför tror jag att det finns ett behov av att under gudstjänsten få vistas i ett fysiskt rum som är heligt och avskilt från resten av staden.\n\nJag skrev ett mejl till prästen som jobbade i kyrkan och förklarade att vi var ett gäng vänner som gärna skulle vilja fira nattvard i just hennes kyrka. Att vi var ett gäng var visserligen en vit lögn just då eftersom det bara var jag som visste något om den planerade gudstjänsten. Prästen föreslog att vi skulle träffas och prata.\n\nVårt första möte var över på en kvart.\n\nHon insisterade på att vi skulle pröva två gånger och sen utvärdera. Hon hade förslag på gudstjänstordning och jag fick ansvara för musiken, att människor hittade dit och att ställa fram stolar innan alla kom. Onsdagar tycktes vara den dag i veckan som passade bäst och därför kom gudstjänsten att kallas för Onsdagsmässan.\n\nVi kom överens om att kollekten skulle gå till en organisation som hjälper de prostituerade som håller till vid Rosenlundsgatan utanför kyrkan. Målet var att försöka finansiera en kvällsmat i veckan för tjejerna.\n\nEfter vår träff hade jag bara ett par grejer kvar som jag behövde ordna innan vi var redo för gudstjänst: musik och besökare. Sam var en vän som tidigare hade lett sången i olika kyrkor. Jag berättade för honom om min idé, om en mässa som skulle få oss som tidigare varit med i kyrkan att komma tillbaka. Jag frågade om han hade lust att spela. Han svarade att han inte visste om han längre trodde på Gud. »Bra«, sa jag, »då får du spela låtar som handlar just om det. Ju ärligare, desto bättre.« Sam blev min wingman i projektet. Sedan spred jag vidare till några av mina vänner att det var en mässa på gång.\n\nInför det första tillfället var både jag och Sam otroligt nervösa. Skulle det bli pannkaka av allt?\n\nDet kom tjugotvå personer.\n\nVi sjöng några enkla sånger hämtade från Taizé. Prästen höll i nattvarden. Sam sjöng en sång av Olle Ljungström med texten: »Den som växer och blir stor, vet exakt var värken bor. Om hon nångång tittat in, innanför sitt skinn. Det är du som väljer så var noga med ditt val. Det är ändå du som väljer vem du är.« I slutet av mässan gav vi en kollekt och sen gick vi till en pub i närheten. Där fortsatte gemenskapen, eller kyrkkaffet om man hellre vill kalla det för det.\n\nTanken var att vi skulle fira Onsdagsmässan ett par gånger. Nu har vi firat Onsdagsmässa i den gamla mögelluktande kyrkan i mer än sex år.\n\nJag trodde aldrig att vi skulle hålla på så här länge. Tanken var ju bara att skapa ett förslag på en gudstjänst för de som inte längre visste om de trodde på Gud, men som ändå ville fira nattvard. Vi har hållit kvar vid samma gudstjänstordning sedan den där första onsdagen. Nattvard som prästen håller i, en enkel bekännelse, sång från en musiker (som sitter i bänkarna, inte på estraden), kollekt och sen kyrkkaffe.\n\nEnkelt, men ändå har jag lärt mig oerhört mycket.\n\nTill exempel att antalet gudstjänstbesökare inte är ett fungerande mätinstrument för att ta reda på om gudstjänsten varit lyckad. Vid ett tillfälle var det endast Sam, prästen och en annan besökare på mässan. Vid nästa tillfälle gick jag fram till prästen innan mässan och bad om ursäkt för att de hade varit så få gången innan. Hon tittade på mig och sa: »Det är inte antalet besökare som räknas. Det är det faktum att vi firar mässa som spelar roll.« Något skamsen gick jag därifrån och började sätta fram stolar inför kvällens mässa. Lättad över att hon inte hade blivit ledsen över att de varit så få, och glad för att hon gjorde det tydligt för mig att antalet gudstjänstbesökare spelar mindre roll. I en frikyrklig kultur är det ofta just det som är första frågan efter att man varit på gudstjänst: Var det många i kyrkan i dag? Antalet besökare har inget med kvalitet att göra, en mer relevant fråga är om någons liv blev förändrat, om någon mötte Gud eller om Gud sa något.\n\nEn gång besökte ett gäng pastorer, präster och ungdomsledare den lilla engelska kyrkan för att höra om mässan. När jag sa att det var fritt fram för frågor sa en kille: »Du säger att detta inte är en församling och att du inte är pastor. Men varje vecka samlar du folk till en mässa. Vad är då en pastor och vad är en församling?« Jag blev tyst. Sen svarade jag honom att jag inte är pastor. Den andra frågan duckade jag för. Jag hade inget svar på frågan om vad en församling är. Den frågan är fortfarande svår. Vad är en församling? Man kan tala om medlemmar, om strukturer eller visioner och mål. Men kanske ställer vi bara frågan helt fel. I stället för att fråga »Vad är en församling« eller »Hur ska en församling vara?«, kanske man i stället ska fråga »När är vi en församling?« Då blir inte församlingen knuten till en speciell plats på samma sätt.\n\nDå kan församlingen uppstå mitt på gatan, på baren, vid sjukhussängen eller i samtalet på rasten. I så fall är Onsdagsmässan en form av församling. Men det var aldrig tanken. På sin höjd att det skulle bli en väg in i församlingen. Att detta kunde vara inkörsporten för att återvända till kyrkan.\n\nSjälvklart saknar inte Onsdagsmässan brister. Men varje gång jag försökt lägga ner den har det varit någon som har protesterat och kallat Onsdagsmässan sitt hem. Och hemlös vill jag inte göra någon.\n\nDet finns stunder när jag funderat på vad det egentligen tjänar till. Eller när jag funderat på hur fortsättningen ska se ut för de människor som kommit dit. Har jag nått dem jag från början tänkte att mässan skulle vara till för? Är vi bara till för oss själva eller gör vi någon skillnad? Visst, vi är viktiga för dem som går dit, men hur är det med de andra? Betyder vi något för dem? Nyligen fick jag ett konkret bevis. En av kyrkorna i staden slog upp dörrarna för flyktingar och behövde människor som hjälpte till med allt från att laga mat till att sova över i kyrkan. Det var med stor glädje jag läste deltagarlistan och hittade namnen på många som varit delaktiga i Onsdagsmässan.\n\nOnsdagsmässan har fått mig tillbaka till kyrkbänken. Jag skulle fortfarande definiera min relation till kyrkan mer som »it’s complicated« än »in a relationship«. Samtidigt finns det något i det bob hund sjunger:\n\n»Det skulle vara lätt för mig att säga att jag inte hittar hem, men det gör jag, tror jag ...«"', // eslint-disable-line max-len
        readMoreLink: <ReadMoreLink href="/information" />,
      },
      {
        title: 'Musik',
        to: 'musik',
        spotify: 'spotify:user:onsdagsm%C3%A4ssan:playlist:4dDDM2RIVweg1Smi9GemJY',
        source: 'Musik conceptam reprimique duo ei, impedit tibique omittantur ne mea, mel stet consectetuer ut. Ut qui ubique definiebas percipitur, fabulas legimus signiferumque duo an. At iisque impedit salutatus cum, pri vidit referrentur eu, quo praesent expetendis interesset eu.\n\nEros sanctus his ex. At liber electram posidonium ius. Te mei dico audire veritus. Nullam sententiae consequuntur est at, his an discere suscipiantur. Stet conceptam reprimique duo ei, impedit tibique omittantur ne mea, mel stet consectetuer ut. Ut qui ubique definiebas percipitur, fabulas legimus signiferumque duo.\n\nAt iisque impedit salutatus cum, pri vidit referrentur eu, quo praesent expetendis interesset eu. Eros sanctus his ex. At liber electram posidonium ius. Te mei dico audire veritus. Nullam sententiae consequuntur est at, his an discere suscipiantur.', // eslint-disable-line max-len
      },
    ];

    const navItems = [{ title: 'Hem', to: 'hem' }, ...sections];

    return (
      <div className="container">
        <Head />
        <Nav showNav={this.state.showNav} onClick={this.onNavClick} items={navItems} />
        <Header img="/static/img/akvarell-0.png" addScroll={this.addScrollEvent} />
        {sections.map((props) => (
          <Section key={props.title} {...props} addScroll={this.addScrollEvent} />
        ))}
        <Footer />
      </div>
    );
  }
}

css.insertRule(`html { font-size: ${vars.font.base} }`);
css.insertRule('*, *::before, *::after { box-sizing: border-box }');
css.insertRule(`
  body {
    margin: 0;
    font-family: ${vars.font.family.sansSerif};
    border-left: ${vars.border.width} solid ${vars.color.main};
    border-right: ${vars.border.width} solid ${vars.color.main};
    background: url('/static/img/bg.jpg') ${vars.color.background};
  }

  body::before,
  body::after {
    content: '';
    position: fixed;
    background: ${vars.color.main};
    left: 0;
    right: 0;
    height: ${vars.border.width};
    z-index: 1;
  }

  body::before { top: 0; }
  body::after { bottom: 0; }
`);
