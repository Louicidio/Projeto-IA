import getVizinho  from "./vizinho";
import mapa from "./mapa";

function DistanciaEuclidiana(a: CurrentNode, b: CurrentNode): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export interface CurrentNode{
    x: number;
    y: number;
    g: number;
    h: number;
    f: number;
    parent: CurrentNode | null;
}

function AStar(start: CurrentNode, chegada: CurrentNode, mapa: number[][]): CurrentNode[] {
    const abertos: CurrentNode[] = [];
    const fechados: Set<string> = new Set();

    const pontG: Map<string, number> = new Map();
    const pontf: Map<string, number> = new Map();

    const parents: Map<string, CurrentNode | null > = new Map();

    const chave = (x: number, y: number): string => `${x},${y}`;

    // no inicial

    pontG.set(chave(start.x, start.y), 0);
    pontf.set(chave(start.x, start.y), DistanciaEuclidiana(start, chegada));
    parents.set(chave(start.x, start.y), null);
    abertos.push({...start, g: 0, h: DistanciaEuclidiana(start, chegada), f: 0});

    while (abertos.length > 0) {

        abertos.sort((a, b) => (a.f - b.f));
        const atual = abertos.shift()!;

        if (atual.x === chegada.x && chegada.y === atual.y) {
            const caminho: CurrentNode[] = [];

            let chaveAtual = chave(atual.x, atual.y);
            let CurrentNodeAtual: CurrentNode | null = atual;

            while (CurrentNodeAtual){
                caminho.push(CurrentNodeAtual);
                CurrentNodeAtual = parents.get(chaveAtual) ?? null;
                chaveAtual = CurrentNodeAtual ? chave(CurrentNodeAtual.x, CurrentNodeAtual.y) : "";
            }
            return caminho.reverse();
        }
        fechados.add(chave(atual.x, atual.y));

        for(const u of getVizinho(atual, mapa)){
            const chaveU = chave(u.x, u.y);
            const tentativeG = (pontG.get(chave(atual.x, atual.y)) ?? Infinity + 1)

            if(fechados.has(chaveU)){
                continue;
            }
            
            if(!abertos.some((node)=> node.x === u.x && node.y === u.y)|| tentativeG < (pontG.get(chaveU) ?? Infinity)){
                pontG.set(chaveU, tentativeG);
                const h = DistanciaEuclidiana(u, chegada);
                const f = tentativeG + h
                pontf.set(chaveU, f);

                if(!abertos.some((node) => node.x === u.x && node.y === u.y)){
                    abertos.push({...u, g: tentativeG, h, f, parent: atual})
                }
            }

        }
    }
    return [];
}


export default AStar;

function main(){ 
    const mapaAtual = mapa;
    const start: CurrentNode = { x: 0, y: 0, g: 0, h: 0, f: 0, parent: null };
    const chegada: CurrentNode = { x: 3, y: 6, g: 0, h: 0, f: 0, parent: null };

    console.log("mapa: ");
    for(const linha of mapaAtual){
        console.log(linha.join(" "));

    }
    const caminho = AStar(start, chegada, mapaAtual);
    {

        if(caminho.length === 0){
        console.log("Caminho encontrado.");
        {
            for(const node of caminho){
                console.log('(%{node.x}, ${node.y})')
            }
        } 

        } else {
            console.log("/n Caminho não encontrado.")
        }

    }
}

main();