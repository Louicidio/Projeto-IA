"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vizinho_1 = __importDefault(require("./vizinho"));
const mapa_1 = __importDefault(require("./mapa"));
function DistanciaEuclidiana(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
function AStar(start, chegada, mapa) {
    var _a, _b, _c;
    const abertos = [];
    const fechados = new Set();
    const pontG = new Map();
    const pontf = new Map();
    const parents = new Map();
    const chave = (x, y) => `${x},${y}`;
    // no inicial
    pontG.set(chave(start.x, start.y), 0);
    pontf.set(chave(start.x, start.y), DistanciaEuclidiana(start, chegada));
    parents.set(chave(start.x, start.y), null);
    abertos.push(Object.assign(Object.assign({}, start), { g: 0, h: DistanciaEuclidiana(start, chegada), f: 0 }));
    while (abertos.length > 0) {
        abertos.sort((a, b) => (a.f - b.f));
        const atual = abertos.shift();
        if (atual.x === chegada.x && chegada.y === atual.y) {
            const caminho = [];
            let chaveAtual = chave(atual.x, atual.y);
            let CurrentNodeAtual = atual;
            while (CurrentNodeAtual) {
                caminho.push(CurrentNodeAtual);
                CurrentNodeAtual = (_a = parents.get(chaveAtual)) !== null && _a !== void 0 ? _a : null;
                chaveAtual = CurrentNodeAtual ? chave(CurrentNodeAtual.x, CurrentNodeAtual.y) : "";
            }
            return caminho.reverse();
        }
        fechados.add(chave(atual.x, atual.y));
        for (const u of (0, vizinho_1.default)(atual, mapa)) {
            const chaveU = chave(u.x, u.y);
            const tentativeG = ((_b = pontG.get(chave(atual.x, atual.y))) !== null && _b !== void 0 ? _b : Infinity + 1);
            if (fechados.has(chaveU)) {
                continue;
            }
            if (!abertos.some((node) => node.x === u.x && node.y === u.y) || tentativeG < ((_c = pontG.get(chaveU)) !== null && _c !== void 0 ? _c : Infinity)) {
                pontG.set(chaveU, tentativeG);
                const h = DistanciaEuclidiana(u, chegada);
                const f = tentativeG + h;
                pontf.set(chaveU, f);
                if (!abertos.some((node) => node.x === u.x && node.y === u.y)) {
                    abertos.push(Object.assign(Object.assign({}, u), { g: tentativeG, h, f, parent: atual }));
                }
            }
        }
    }
    return [];
}
exports.default = AStar;
function main() {
    const mapaAtual = mapa_1.default;
    const start = { x: 0, y: 0, g: 0, h: 0, f: 0, parent: null };
    const chegada = { x: 3, y: 6, g: 0, h: 0, f: 0, parent: null };
    console.log("mapa: ");
    for (const linha of mapaAtual) {
        console.log(linha.join(" "));
    }
    const caminho = AStar(start, chegada, mapaAtual);
    {
        if (caminho.length === 0) {
            console.log("Caminho encontrado.");
            {
                for (const node of caminho) {
                    console.log('(%{node.x}, ${node.y})');
                }
            }
        }
        else {
            console.log("/n Caminho não encontrado.");
        }
    }
}
main();
