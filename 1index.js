let contador = 0;

class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
        this.id = contador++;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;

        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    search(value) {
        let current = this.root;

        const path = [];

        while (current) {
            path.push(current.value);

            if (current.value === value) {
                return { node: current, path };
            }

            current = value < current.value ? current.left : current.right;
        }

        return { node: null, path };
    }

    preOrder(node, result = []) {
        if (!node) return result;

        result.push(node.value);
        this.preOrder(node.left, result);
        this.preOrder(node.right, result);

        return result;
    }
}


let tree = new BinarySearchTree();


////////////////////////////RENDER DEL ÁRBOL
function renderTree(tree, path = [], foundValue = null) {
    let tree2 = document.querySelector("#tree");

    const container = tree2

    if (tree.root == null) {
        container.innerHTML = "";
        return;
    }

    container.innerHTML = `
<ul class="po-tree-list">
 <li class="po-li node-root ">
${crearHTML(tree.root, path, foundValue)}
</li>
</ul>
`;
}

function crearHTML(node, path = [], foundValue = null) {

    if (node == null) {
        return "";
    }
    // Determinar clase CSS según si está en el camino o es el valor encontrado
    let clase = "nodo";
    if (foundValue !== null && node.value === foundValue) {
        clase = "nodo encontrado ganador";
    } else if (path.includes(node.value)) {
        clase = "nodo camino ";
    }

    return `
<li class="po-li node-root ">
 
<div id="nodo-${node.id}" class="${clase} po-node-wrap ">
<div >
${node.value}
</div>
</div>
 
<ul>
 
${crearHTML(node.left, path, foundValue)}
${crearHTML(node.right, path, foundValue)}
 
</ul>
 
</li>
`;
}

///don 
let btnInsertar = document.querySelector("#btnInsertar")
let btnBuscar = document.querySelector("#btnBuscar")
let recorrido = document.querySelector("#recorrido")
let btnLimpiarBusqueda=document.querySelector('#btnLimpiarBusqueda')


/// input
let input = document.getElementById("inputBuscar");


////// UI mensajes
let msgEncontrado = document.querySelector("#msgEncontrado")
let msgNoEncontrado = document.querySelector("#msgNoEncontrado")
let valEncontrado = document.querySelector("#valEncontrado")
let pasosBusqueda = document.querySelector("#pasosBusqueda")


//////////////////////////// CINTA PREORDER
function updatePreOrder() {
    let  tape = document.querySelector("#preorderTape");
    if (!tape) return;

    let  values = tree.preOrder(tree.root);

}


btnInsertar.addEventListener("click", () => {
    let  input = document.getElementById("inputInsertar");
    let  value = Number(input.value);


    tree.insert(value);

    renderTree(tree);
    updatePreOrder();

    input.value = "";

    console.log(tree.preOrder(tree.root));
    console.log(tree);
});

tree.insert(30);
tree.insert(10);
tree.insert(8);
tree.insert(50);
tree.insert(41);
tree.insert(31);
tree.insert(57);



btnBuscar.addEventListener("click", () => {

    let  value = Number(input.value);

   

    let result = tree.search(value);
    renderTree(tree, result.path, result.node ? value : null);


    if (result.node) {
        msgEncontrado.style.display = "flex";
        msgNoEncontrado.style.display = "none";
        valEncontrado.textContent = value;
        pasosBusqueda.textContent = result.path.join(" → ");
    } else {
        msgEncontrado.style.display = "none";
        msgNoEncontrado.style.display = "flex";
    }
});


recorrido.addEventListener('click', () => {

    let  values = tree.preOrder(tree.root);

    if (!values.length)  {
       return; 
    } 

    let caminoActual = [];

    values.forEach((valor, indice) => {

        setTimeout(() => {

            caminoActual.push(valor);
            

            let esUltimo = indice === values.length - 1;

            renderTree(tree, caminoActual, valor);

        }, indice * 700); 
    });

    

});


btnLimpiarBusqueda.addEventListener('click',()=>{
    
})



renderTree(tree);
updatePreOrder();