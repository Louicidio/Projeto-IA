import mapa from "./mapa";
import { CurrentNode } from ".";

function getVizinho(currentNode: CurrentNode, mapa: number[][]): CurrentNode[]{
    const vizinhos: CurrentNode[] = [];
    const direcoes = [
        {dx: 0, dy: -1}, // cima
        {dx: 1, dy: 0}, // direita
        {dx: 0, dy: 1}, // baixo
        {dx: -1, dy: 0}, // esquerda
    ];
    for(const {dx, dy} of direcoes){
        const novoX = currentNode.x + dx;
        const novoY = currentNode.y + dy;

        if(mapa[novoX] && novoX < mapa.length && novoY >= 0 && novoY < mapa[0].length){
            if(mapa[novoX][novoY]!== 0){
                vizinhos.push({ x: novoX, y: novoY, g: 0, h: 0, f: 0, parent: currentNode});

            }
        }
    }
    return vizinhos;
}
export default getVizinho;