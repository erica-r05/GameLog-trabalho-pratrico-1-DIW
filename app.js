function irParaDetalhe(itemId) {
    window.location.href = "detalhes.html?id=" + itemId;
}
const DadosdoItem = {
    DetalhesGame: [
        0, {
            id: 0,
            nome: "Minecraft",
            imagem_principal: "img/minecraft.jpg",
            dataLancamento: "17/05/2009",
            categoria: "Sandbox (Mundo Aberto)",
            descricao: "Minecraft é um jogo eletrônico onde os jogadores exploram um vasto mundo 3D gerado proceduralmente, composto quase inteiramente por blocos cúbicos. Os jogadores podem quebrar, colocar e manipular esses blocos para construir estruturas, criar ferramentas e artefatos, e interagir com o ambiente e criaturas (mobs). O jogo não tem um objetivo definido e incentiva a criatividade e a exploração. Os modos de jogo incluem Sobrevivência (onde é preciso coletar recursos, manter a saúde e se defender de monstros) e Criativo (onde se tem acesso ilimitado a todos os blocos e itens, sem ameaças, para construir livremente).",
            curiosidade: "O Creeper, um dos monstros mais icônicos do jogo, nasceu de um erro de programação. O criador, Markus 'Notch' Persson, estava tentando criar um modelo de um porco, mas acidentalmente inverteu os valores de altura e comprimento, resultando em uma criatura alta e esquisita. Ele gostou do resultado bizarro e decidiu transformá-la em um novo mob.",
            fotos: [
                "link/foto1.jpg",
                "link/foto2.jpg",
                "link/foto3.jpg",
                "link/foto3.jpg"
            ]
        },
        1, {
            id: 1,
            nome: "Resident Evil 4",
            imagem_principal: "img/residentevil4.png",
            dataLancamento: "11/01/2005",
            categoria: "Survival Horror (Horror de Sobrevivência)",
            descricao: "Resident Evil 4 é um marco na série que mudou drasticamente a jogabilidade, afastando-se das câmeras fixas e focando em mais ação e tiroteios. O jogador controla Leon S. Kennedy, seis anos após o incidente em Raccoon City, em uma missão para resgatar a filha do presidente dos EUA, Ashley Graham, em uma vila rural isolada na Europa. Leon enfrenta aldeões infectados e membros de um culto misterioso (Los Illuminados) que carregam o parasita Las Plagas. O jogo introduziu a câmera por cima do ombro, que se tornou um padrão para muitos jogos de tiro em terceira pessoa posteriores.",
            curiosidade: "Resident Evil 4 teve várias versões canceladas e diferentes em desenvolvimento antes de chegar à sua forma final. Uma dessas versões, que acabou sendo descartada, deu origem a uma franquia completamente nova da Capcom: o primeiro jogo da série Devil May Cry. O diretor da série, Shinji Mikami, decidiu que a versão era muito focada em ação e não parecia um Resident Evil, então a transformou em um novo título estrelado por Dante.",
            fotos: [
                "link/foto1.jpg",
                "link/foto2.jpg",
                "link/foto3.jpg",
                "link/foto3.jpg"
            ]
        },
        2, {
            id: 2,
            nome: "The last of us",
            imagem_principal: "img/tlou.jpg",
            dataLancamento: "14/06/2013",
            categoria: "Survival Horror (Horror de Sobrevivência)",
            descricao: "The Last of Us se passa em um Estados Unidos pós-apocalíptico, vinte anos após uma pandemia causada pelo fungo Cordyceps, que transforma os humanos em criaturas infectadas. O jogo segue a jornada de Joel Miller, um contrabandista amargurado, encarregado de escoltar a adolescente Ellie Williams através do país. Ellie é imune ao fungo e representa a última esperança da humanidade. A jogabilidade mistura combate intenso (principalmente com foco em escassez de recursos e furtividade) com uma narrativa profundamente dramática e focada na relação dos dois protagonistas. ",
            curiosidade: "O fungo Cordyceps realmente existe na vida real. O fungo Ophiocordyceps unilateralis (o Cordyceps) é um parasita que infecta o cérebro de insetos, especialmente formigas, controlando seu comportamento para fazê-las subir a pontos altos para espalhar seus esporos. A premissa do jogo é uma extrapolação ficcional de como esse fungo poderia evoluir para afetar os humanos.",
            fotos: [
                "link/foto1.jpg",
                "link/foto2.jpg",
                "link/foto3.jpg",
                "link/foto3.jpg"
            ]
        },
        3, {
            id: 3,
            nome: "Fortnite",
            imagem_principal: "imgs/cards/Fornite logo 2024.jpg",
            dataLancamento: "26/09/2017",
            categoria: "Battle Royale",
            descricao: "Fortnite é um jogo multijogador online que se popularizou pelo seu modo Battle Royale, onde 100 jogadores caem em uma ilha, buscam armas e itens, e lutam para ser o último sobrevivente ou a última equipe de pé. Uma \"Tempestade\" que se aproxima força os jogadores a se reunirem em áreas cada vez menores. O que diferencia Fortnite é a sua mecânica de construção, que permite aos jogadores coletar materiais e construir estruturas (paredes, rampas, pisos) rapidamente para se defender, ganhar vantagem tática ou se mover pelo mapa. O jogo também é conhecido por seus gráficos coloridos, estilo cartunesco e pelos constantes eventos, temporadas e crossovers com grandes franquias da cultura pop.",
            curiosidade: "Não era para ser um Battle Royale. O conceito original de Fortnite (o modo Salve o Mundo) era focado em jogadores cooperando para construir fortes durante o dia e defendê-los de zumbis à noite (daí o nome Fort-Nite, \"Noite do Forte\"). O modo Battle Royale só foi desenvolvido e adicionado cerca de dois meses após o lançamento do jogo original, como uma resposta rápida ao sucesso de PlayerUnknown's Battlegrounds (PUBG). A Epic Games reutilizou a mecânica de tiro e construção que já existia no modo PvE para criar o fenômeno global.",
            fotos: [
                "link/foto1.jpg",
                "link/foto2.jpg",
                "link/foto3.jpg",
                "link/foto3.jpg"
            ]
        },
        4, {
            id: 4,
            nome: "Grand Theft Auto V (GTA V)",
            imagem_principal: "imgs/cards/Grand Theft Auto V – Wikipedia.jpg",
            dataLancamento: "17/09/2013",
            categoria: "Mundo Aberto (Open-World)",
            descricao: "Grand Theft Auto V se passa no estado fictício de San Andreas (baseado no sul da Califórnia), com foco na cidade de Los Santos (uma sátira de Los Angeles). O modo história é único na franquia por ter três protagonistas jogáveis cujas vidas se cruzam: Michael De Santa (um ex-ladrão de bancos de meia-idade), Franklin Clinton (um jovem gângster de rua) e Trevor Philips (um psicopata e ex-parceiro de Michael). O enredo acompanha o trio enquanto eles realizam uma série de assaltos ambiciosos, sob a pressão de uma agência governamental corrupta e do submundo do crime. O mundo aberto massivo permite aos jogadores explorar livremente, participar de diversas atividades (como mergulho, golfe, caça, corridas) e, é claro, causar o caos. O jogo inclui o popular modo online, Grand Theft Auto Online (GTA Online), que permite a até 30 jogadores explorar o mundo, realizar missões cooperativas (como Golpes) e participar de atividades competitivas. ",
            curiosidade: "Orçamento e Faturamento Recordes: GTA V foi um dos produtos de entretenimento mais caros já criados, com um orçamento estimado em mais de US$ 265 milhões. O investimento se pagou rapidamente: o jogo se tornou o produto de entretenimento a faturar mais rápido na história, ultrapassando US$ 1 bilhão em vendas apenas nos seus primeiros três dias após o lançamento. Ele detém vários recordes mundiais do Guinness.",
            fotos: [
                "link/foto1.jpg",
                "link/foto2.jpg",
                "link/foto3.jpg",
                "link/foto3.jpg"
            ]
        },
        5, {
            id: 5,
            nome: "Counter-Strike 2",
            imagem_principal: "imgs/cards/HLDS Counter Strike 1_6 Server.jpg",
            dataLancamento: "27/09/2023",
            categoria: "Tiro Tático em Primeira Pessoa (FPS)",
            descricao: "Counter-Strike 2 é a continuação do legado do CS:GO, desenvolvido na nova engine Source 2 da Valve. O jogo mantém o gameplay central de confronto entre duas equipes—Terroristas (TR), que tentam plantar uma bomba (C4), e Contra-Terroristas (CT), que tentam impedir e desarmar a bomba ou resgatar reféns—com foco em táticas, precisão de tiro e economia de rodadas. O CS2 não é apenas uma atualização visual; ele introduz melhorias técnicas significativas, como:\n Arquitetura Sub-Tick: Promete que os movimentos e tiros serão processados no servidor exatamente quando ocorrem, independentemente da taxa de atualização (tickrate) do servidor.\n Granadas de Fumaça Dinâmicas: A fumaça agora é um objeto volumétrico que reage à iluminação, e o fumo pode ser dispersado temporariamente por balas ou explosões.\n Mapas Remodelados: Os mapas clássicos foram atualizados com a Engine Source 2, apresentando iluminação e detalhes visuais aprimorados.\n O jogo agora possui um sistema de classificação unificado, o 'CS Rating', que mede o desempenho geral do jogador no Modo Premier. ",
            curiosidade: "Substituição, Não Sequência: Diferentemente de outros jogos que mantêm seus antecessores após o lançamento de uma sequência (como GTA V e Fortnite), o CS2 substituiu completamente o CS:GO na Steam. Quando o CS2 foi lançado, ele assumiu o lugar do CS:GO, e todos os jogadores herdaram seus inventários de skins, mantendo o valor e a raridade de seus itens no novo motor gráfico.",
            fotos: [
                "link/foto1.jpg",
                "link/foto2.jpg",
                "link/foto3.jpg",
                "link/foto3.jpg"
            ]
        },
        6, {
            id: 6,
            nome: "League of Legends (LoL)",
            imagem_principal: "imgs/cards/League of Legends.jpg",
            dataLancamento: "27/10/2009",
            categoria: "Multiplayer Online Battle Arena (MOBA)",
            descricao: "League of Legends é um jogo de estratégia em que duas equipes de cinco jogadores competem para destruir a base adversária, conhecida como Nexus, que fica protegida por torres e inibidores. Cada jogador controla um 'Campeão' com um conjunto único de habilidades. Atualmente, existem mais de 160 Campeões disponíveis, cada um adaptado para diferentes funções e rotas no mapa (Topo, Selva, Meio, Rota Inferior/Atirador e Suporte). O mapa principal é o Summoner's Rift, dividido em três rotas e uma área de Selva. As partidas são altamente estratégicas, exigindo coordenação de equipe, farm (coleta de ouro e experiência) e a conquista de objetivos neutros cruciais, como Dragões e o Barão Na'Shor. O jogo é amplamente conhecido por sua influência no cenário de eSports, com ligas regionais e o prestigiado Campeonato Mundial de League of Legends (Worlds), que atrai milhões de espectadores. ",
            curiosidade: "Interações Secretas ('Easter Eggs'): O LoL é famoso por ter interações secretas que não afetam significativamente a jogabilidade, mas adicionam charme e detalhes à lore (história do universo). Por exemplo: \n Campeões que usam óculos escuros (como Vayne) recebem 1 ponto a menos de dano da habilidade passiva 'Luz do Sol' da Campeã Leona. \n Se uma Vi ou Caitlyn (policiais) abater a Jinx (criminosa), ou vice-versa, elas ganham um ponto no atributo secreto de lore e um pequeno bônus de ouro. ",
            fotos: [
                "link/foto1.jpg",
                "link/foto2.jpg",
                "link/foto3.jpg",
                "link/foto3.jpg"
            ]
        },
        7, {
            id: 7,
            nome: "Roblox",
            imagem_principal: "imgs/cards/Roblox.jpg",
            dataLancamento: "01/09/2006",
            categoria: "Metaverso/Sandbox",
            descricao: "Roblox não é um único jogo, mas sim uma plataforma global que permite a milhões de usuários (chamados de 'Criadores') desenvolverem, publicarem e jogarem uma vasta e infinita variedade de 'Experiências' (jogos). O foco está na criação e personalização. Os usuários utilizam o Roblox Studio para construir seus mundos, que podem variar de simuladores e jogos de RPG (Role-Playing Game) a jogos de terror e battle royales. Os personagens são avatares estilo blocos, altamente personalizáveis. O jogo possui uma economia virtual com a moeda Robux, que é usada para comprar itens cosméticos e passes dentro das experiências. Sua principal característica é o conteúdo gerado pelo usuário, que o torna um metaverso em constante evolução e um dos lugares mais populares para crianças e adolescentes socializarem e jogarem online. ",
            curiosidade: "Moeda Antiga (Tix): Por um tempo, o Roblox tinha duas moedas: o Robux (a moeda paga) e o Tix (Tickets), que os jogadores ganhavam gratuitamente apenas por logar no site diariamente. O Tix foi descontinuado em 2016.",
            fotos: [
                "link/foto1.jpg",
                "link/foto2.jpg",
                "link/foto3.jpg",
                "link/foto3.jpg"
            ]
        },
        8, {
            id: 8,
            nome: "Dota 2",
            imagem_principal: "imgs/cards/dota2.jpg",
            dataLancamento: "09/07/2013",
            categoria: "Multiplayer Online Battle Arena",
            descricao: "Dota 2 é um jogo de estratégia em que duas equipes de cinco jogadores controlam heróis únicos com o objetivo de destruir a estrutura central da base inimiga, conhecida como Ancient (Ancião). As equipes são divididas entre Radiant e Dire, e o campo de batalha é dividido em três rotas (lanes). O mapa é simétrico, mas os detalhes do terreno e os caminhos da selva (jungle) criam diferenças estratégicas importantes. Existem mais de 100 heróis no jogo, e todos são gratuitos para jogar desde o início. Os heróis são classificados por seu atributo principal (Força, Agilidade ou Inteligência) e por suas funções esperadas na partida (Carry, Meio, Offlane, Suporte Leve e Suporte Pesado). O jogo é extremamente conhecido por sua profundidade de mecânicas, incluindo a negação de experiência e ouro (o ato de matar seus próprios creeps ou torres) e a importância de itens ativáveis e estratégias de grupo. ",
            curiosidade: "O Maior Prêmio de eSports: O Dota 2 detém o recorde de maior premiação total já distribuída em um único evento de eSports. O campeonato anual 'The International' (TI) é financiado em grande parte pela comunidade através de compras dentro do jogo (Battle Pass e itens cosméticos), com o prêmio total frequentemente ultrapassando a marca dos dezenas de milhões de dólares.",
            fotos: [
                "link/foto1.jpg",
                "link/foto2.jpg",
                "link/foto3.jpg",
                "link/foto3.jpg"
            ]
        },
        9, {
            id: 9,
            nome: "PUBG: Battlegrounds",
            imagem_principal: "imgs/cards/pubg.jpg",
            dataLancamento: "23/03/2017",
            categoria: "Battle Royale",
            descricao: "PUBG: BATTLEGROUNDS é um jogo de tiro de sobrevivência em que 100 jogadores caem de paraquedas em uma vasta ilha desarmados e devem procurar armas, equipamentos e veículos enquanto a área segura do mapa encolhe progressivamente (a famosa 'Zona Azul'). O objetivo é ser o último jogador ou equipe (squad) sobrevivente. O jogo se destaca por seu foco em uma experiência mais realista e tática de tiro e sobrevivência, em comparação com outros títulos do gênero. A jogabilidade envolve pilhagem intensa, gerenciamento de inventário e balística realista para as armas. O jogo é amplamente considerado o título que popularizou e estabeleceu o formato Battle Royale na indústria de jogos moderna. ",
            curiosidade: "O Criador (PlayerUnknown): O conceito do PUBG foi desenvolvido por Brendan Greene, que usava o nickname PlayerUnknown. Ele havia criado anteriormente mods Battle Royale para jogos como ARMA 2 e DayZ.",
            fotos: [
                "link/foto1.jpg",
                "link/foto2.jpg",
                "link/foto3.jpg",
                "link/foto3.jpg"
            ]
        },
        10, {
            id: 10,
            nome: "Apex Legends",
            imagem_principal: "imgs/cards/apexleg.jpg",
            dataLancamento: "04/02/2019",
            categoria: "Battle Royale",
            descricao: "Apex Legends é um Battle Royale em ritmo acelerado onde 20 esquadrões de três (ou 30 duplas, totalizando 60 jogadores) competem para ser o último time sobrevivente. Sua principal inovação é a integração do gênero Hero Shooter: cada jogador escolhe uma 'Lenda' (personagem) com habilidades únicas (tática, passiva e ultimate) que se complementam em combate.O jogo é conhecido por seu sistema de ping (sinalização), que permite uma comunicação extremamente eficiente dentro do esquadrão, mesmo sem usar o chat de voz. A jogabilidade é dinâmica, com forte ênfase na movimentação fluida (como deslizar e escalar) e no combate em equipe. O jogo se passa no universo da franquia Titanfall, da mesma desenvolvedora (Respawn Entertainment). ",
            curiosidade: "A Origem Inesperada: O jogo foi lançado sem nenhum aviso prévio ou campanha de marketing extensa, o que é muito raro para um título de grande porte. A surpresa e a qualidade do jogo foram cruciais para seu sucesso inicial, atingindo 25 milhões de jogadores em sua primeira semana.",
            fotos: [
                "link/foto1.jpg",
                "link/foto2.jpg",
                "link/foto3.jpg",
                "link/foto3.jpg"
            ]
        },
        11, {
            id: 11,
            nome: "Genshin Impact",
            imagem_principal: "imgs/cards/Genshin Impact Circle App PNG Transparent With Clear Background ID 472716 _ TopPNG.jpg",
            dataLancamento: "28/09/2020",
            categoria: "RPG de Ação (ARPG)",
            descricao: "Genshin Impact é um jogo de aventura em um vasto mundo de fantasia chamado Teyvat, onde o jogador assume o papel do 'Viajante' (gêmeo/gêmea), que está em busca de seu irmão(ã) perdido(a) após serem separados por uma divindade desconhecida. O jogador explora livremente o mundo, resolvendo quebra-cabeças, completando missões, cozinhando, e, principalmente, combatendo. O sistema de combate é o seu ponto forte, baseado na troca rápida entre um grupo de quatro personagens e o uso estratégico de sete elementos (Pyro, Hydro, Electro, Cryo, Anemo, Geo e Dendro) para desencadear Reações Elementais devastadoras. O modelo de monetização é baseado no sistema gacha (Wishes ou 'Orações'), onde o jogador gasta uma moeda do jogo (Primogemas) para tentar obter novos personagens e armas raras.",
            curiosidade: "Conteúdo Constante: O jogo opera como um Serviço ao Vivo (Live Service), recebendo grandes atualizações de conteúdo (patches) a cada seis semanas, que adicionam novos personagens, eventos e, a cada ano, uma nova grande região para explorar no mundo de Teyvat.",
            fotos: [
                "link/foto1.jpg",
                "link/foto2.jpg",
                "link/foto3.jpg",
                "link/foto3.jpg"
            ]
        },
        12, {
            id: 12,
            nome: "Garena Free Fire ",
            imagem_principal: "imgs/cards/ff.jpg",
            dataLancamento: "04/10/2017",
            categoria: "Tiro em Terceira Pessoa (TPS)",
            descricao: "Free Fire é um dos jogos Battle Royale mais populares do mundo, especialmente no mercado mobile e em regiões como Sudeste Asiático e América Latina (incluindo o Brasil). O Objetivo: A essência do jogo é simples: 50 jogadores caem de paraquedas em uma ilha, buscam armas e equipamentos, e lutam para ser o último sobrevivente ou o último esquadrão de pé. As partidas são conhecidas por serem rápidas, durando cerca de 10 minutos. Foco no Mobile: O jogo foi otimizado para rodar em dispositivos móveis de baixo custo, o que contribuiu imensamente para sua popularidade global. Personagens e Habilidades: Ao contrário de muitos Battle Royales puristas, Free Fire incorpora Personagens (como Alok, Kelly, Chrono, etc.), cada um com habilidades únicas que afetam a jogabilidade e adicionam um elemento de Hero Shooter. Modos de Jogo: Além do modo principal Battle Royale (BR), o jogo possui o popular Contra Squad (CS), um modo de 4v4 por rodadas. ",
            curiosidade: "Inspiração no Filme Battle Royale: A personagem Kelly é inspirada em Takako Chigusa, uma personagem do famoso filme japonês de 2000, Battle Royale, que popularizou o conceito de luta mortal em uma ilha.",
            fotos: [
                "link/foto1.jpg",
                "link/foto2.jpg",
                "link/foto3.jpg",
                "link/foto3.jpg"
            ]
        }

    ],

};

function carregarDetalhes() {
    // 1. Obter o ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    // 2. Verificar se o ID existe na URL
    if (!itemId) {
        document.getElementById('container-principal').innerHTML = '<p>Item não encontrado (ID não fornecido na URL).</p>';
        return;
    }

    // 3. Buscar o item nos dados (Assumindo que DadosdoItem está definido)
    // CORREÇÃO: Você usou "itemId" duas vezes no seu if/else. Corrigimos a segunda checagem.
    const item = DadosdoItem[itemId];
    if (!item) { // Se o item NÃO for encontrado
        document.getElementById('container-principal').innerHTML = '<p>Item não encontrado (ID inválido).</p>';
        return;
    }

    // A. INJETAR INFORMAÇÕES GERAIS E DETALHES

    // CORREÇÃO: Você precisa de um container principal com o ID onde o conteúdo será injetado.
    // Assumimos que existe um <div id="container-principal"> na sua página.
    document.getElementById('container-principal').innerHTML = `
        <section class="informacoes_gerais">
            <h2>${item.nome}</h2>
            <div class="conteudo_principal">
                <div class="imagem_representativa">
                    <img id="imagem-principal" src="${item.imagem}" alt="${item.nome}">
                </div>
                <div class="detalhes_texto">
                    <ul>
                        <li><span class="label">Nome do jogo:</span> ${item.nome}</li>
                        <li><span class="label">Data de Lançamento:</span> ${item.data_lancamento}</li>
                        <li><span class="label">Categoria:</span> ${item.categoria}</li>
                        <li><span class="label">Descrição:</span> ${item.descricao}</li>
                        <li><span class="label">Curiosidade:</span> ${item.curiosidade}</li>
                    </ul>
                </div>
            </div>
        </section>
        
        <section class="fotos_associadas">
            <h3>Mais fotos (Galeria de Thumbnails)</h3>
            <div class="galeria-thumbnails" id="galeria-thumbnails-container">
                </div>
        </section>
    `;

    // B. CARREGAR A GALERIA DE FOTOS (CHAMA A FUNÇÃO AUXILIAR)
    carregarGaleria(item.fotos_associadas);
}

// Função auxiliar para injetar as miniaturas e dar a funcionalidade de clique
function carregarGaleria(fotos) {
    const containerGaleria = document.getElementById('galeria-thumbnails-container');
    const imagemPrincipal = document.getElementById('imagem-principal');

    // Se a lista de fotos for vazia, adicionamos um placeholder ou nada
    if (!fotos || fotos.length === 0) {
        containerGaleria.innerHTML = '<p>Não há fotos associadas.</p>';
        return;
    }

    // Criamos o HTML das miniaturas
    let thumbnailsHTML = fotos.map(urlFoto => {
        return `
            <div class="thumbnail" data-url="${urlFoto}">
                <img src="${urlFoto}" alt="Screenshot do Jogo" />
            </div>
        `;
    }).join('');

    // Adicionamos o indicador de próximo (se o layout CSS for de rolagem)
    thumbnailsHTML += '<span class="indicador-proximo"> &gt; </span>';

    // Injetamos o HTML das miniaturas
    containerGaleria.innerHTML = thumbnailsHTML;

    // Adicionamos a lógica de clique para trocar a imagem principal
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', (evento) => {
            const novaURL = evento.currentTarget.getAttribute('data-url');
            imagemPrincipal.src = novaURL;
        });
    });
}

// Inicia o carregamento quando a página estiver totalmente carregada
document.addEventListener('DOMContentLoaded', carregarDetalhes);