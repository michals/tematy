<template>
    <h1>O aplikacji</h1>
    <p>
        Aplikacja "Tematy" została opracowana jako pomoc przy przygotowaniu Liturgii Słowa
        dla wspólnot Neokatechumenalnych.
    </p>
    <p>
        Na głównej stronie znajduje się lista tematów wybranych dla spólnot na etapie prekatechumenatu.
        Poniej również jest lista wszystkich haseł se Słownika Teologii Biblijnej.
    </p>
    <p>
        Po wybraniu tematu lub hasła można określić ile osób jest na spotakniu
        (<i class="bi bi-people-fill"></i>).
        Aplikacja wówczas automatycznie porozdziela wersety pomiędzy poszczególne osoby.
        Aby wyświetlić wersety dla konkretnej osoby naley wybrać osobę z rozwijalnej listy
        (<i class="bi bi-asterisk"></i>).
    </p>
    <p>
        Każdy werset jest od razu linkiem do serwisu biblia.pl. Zaczhęcamy oczywiście do czytania
        Pisma w wersji papierowej, ale jeśli ktoś preferuje ekran, to jest to pewne ułatwienie.
    </p>
    <p>
        Przy każdym wersecie jest "kółeczko" które monżna kliknąć i w ten sposób podczas wybierania
        wersetu oznaczyć sobie danego kandydata jako "jedzcze nie wiem" / "raczej nie" / "raczej tak".
    </p>
    <p>
        Po wybraniu tematu lub hasła wersety są już pogrupowane według kolejnych czytań
        (księgi historyczne, prorockie, nowytestament, ewangelie).
    </p>
    <p>
        Aplikacja może działać w różnych konfiguracjach (<i class="bi bi-gear"></i>).
        <strong>DdH</strong>  oznacza księgi Dydaktyczne do Historycznych.
        Natomiast <strong>DdP</strong> to księgi Dydaktyczne do Prorockich.
        Domyślną kofiguracją jest DdH ponieważ w takim układzie najczęściej obecnie wpólnoty pracują.
    </p>
    <p>
        W słowniku czasami zdarzają się bardzo duże wersety. Na przykład w temacie Ewangelia
        jest <em>Iz 40-66</em> czyli 27 rozdziałów zawierających w sumie 526 wersetów.
        Trudno sobie wyobrazić, aby cała grupa czekała trzy godziny aż ktoś kto taki werset dostanie go przeczyał.
        Aplikacja domyślnie ma możliwość odfiltrowywania tego typu ogromnych wersetów aby usprawnić
        techniczne aspekty spotkania. Zobacz konfiguracje "bez ogromnych" vs. "wszystkie".
    </p>
    <p>
        Dodatkowo w aplikacji jest możliwość łączenia pobliskich wersetów.
        Weźmy na przykład temat Świątynia i wersety z <em>1Krl 8</em>.
        W słowniku mamy następujące wersety:
        <ol>
            <li>1Krl 8,1-9</li>
            <li>1Krl 8,10-13</li>
            <li>1Krl 8,16-21</li>
            <li>1Krl 8,27</li>
            <li>1Krl 8,29</li>
        </ol>
        Jeśli wybierzemy konfigurację "<strong>oryginalne</strong>", to aplikacja wyświetli
        wszystkie te wersety tak jak występują w słowniku.

        Jeżeli natomiast wybierzemy opcję "<strong>sklejanie</strong>", to wersety,
        które na siebie nachodzą lub się stykają zostaną połączone w jeden
        i tak z powyższej listy wersetów otrzymamy:
        <ol>
            <li>1Krl 8,1-13 (powstałe po "scaleniu" 1-9 oraz 10-13)</li>
            <li>1Krl 8,16-21</li>
            <li>1Krl 8,27</li>
            <li>1Krl 8,29</li>
        </ol>
        Jeśli natomiast wybierzemy opcję "<strong>grupowanie</strong>" to oprócz scalania
        aplikacja również zgrupuje wersety w ramach tego samego rozdziału o ile nie są od siebie zbytnio oddalone
        i z powyszych wersetów uzyskamy pojedyczne siglo:
        <ol>
            <li>1Krl 8,1-13.16-21.27.29</li>
        </ol>
        Natomiast 1Krl 8,40 już nie zostałby dodany do grupy ponieważ jest zbyt oddalony od wersetu 29.
    </p>
    <p>
        W najnowszej wersji dodatkowo wprowadzono porządkowanie wersetów nie w kolejności
        jak są w Biblii ale w takiej jak występują w słowniku w danym haśle.
    </p>
    <p>
        W przypadku znalezienia jakichś problemów lub błędów, można kontaktować się przez adres:
        <a href="mailto:michal@post.pl">michal@post.pl</a>.
    </p>
</template>

<script>
export default {
  name: 'InfoPage',
  props: {
    json: Object,
  },
};
</script>

<style scoped></style>
