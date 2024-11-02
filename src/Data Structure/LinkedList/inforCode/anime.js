import { styles } from "./colorState.js";

/**
 * This function will create animation for previous and current node
 * when they travel to find a specific index in the list
 * 
 * 
 * @param {String} type the type of operation we currently working on, it's either "remove" or "insert" 
 * @param {Gsap timeline} tl the timeline we need to create animation
 * @param {Dom element} prev the travel node that always point to previous node
 * @param {Dom element} cur  the travel node that always point to current node
 * @param {int} index        the index that the opreration happen, 
 * @param {list of node of the list} nodes list of node in the list
 * @param {list of left position} leftPosLists  list of left position so that we can we current and previous node
 */

export function createAnimationForTravelNode(type, tl, prev, prevChain, cur, curChain, index, nodes, leftPosLists) {
    let i = 0;
    tl.from(prev, {
        x: "5rem",
        opacity: 0,
    }).from(cur, {
        x: "-5rem",
        opacity: 0,
    }, "<").from(cur.querySelector(".vertical-chain"), {
        height: 0,
    });
    changeNodeSyleAnimation(tl, nodes[i],  styles["node-current-visit-style"], styles["node-content-current-visit-style"]);
    while (i < index) {
        if (i === 0) {
            tl.to(prev, {
                left: leftPosLists[i] + "em",
            }).to(prev.querySelector(".vertical-chain"), {
                height: prevChain + 0.5 + "em",
            });
        }
        else {
            tl.to(prev.querySelector(".vertical-chain"), {
                height: 0,
            });
            changeNodeSyleAnimation(tl, nodes[i - 1], styles["node-initial-style"], styles["node-content-initial-style"], "<");
            tl.to(prev, {
                left: leftPosLists[i] + "em",
            }).to(prev.querySelector(".vertical-chain"), {
                height: prevChain + 0.5 + "em",
            });
        }
        changeNodeSyleAnimation(tl, 
                                nodes[i], 
                                styles["node-previous-visit-style"], 
                                styles["node-content-previous-visit-style"]);
        tl.to(cur.querySelector(".vertical-chain"), {
            height: 0,
        }).to(cur, {
            left: leftPosLists[i + 1] + "em",
        }).to(cur.querySelector(".vertical-chain"), {
            height: curChain + 0.5 + "em",
        });
        if (i + 1 === index && type === "insert") {
            changeNodeSyleAnimation(tl, nodes[i + 2], styles["node-current-visit-style"], styles["node-content-current-visit-style"]);
        }
        else {
            changeNodeSyleAnimation(tl, nodes[i + 1], styles["node-current-visit-style"], styles["node-content-current-visit-style"]);
        }
        i++;
    }
    return i;
}

export function changeNodeSyleAnimation(tl, node, pStyle, cStyle, pos) {
    tl.to(node, pStyle, pos).to(node.querySelectorAll("button"), cStyle, "<");
}


export function moveNodeToRight(tl, nodes, gap) {
    nodes.forEach(node => {
        let nodeWidth = getNodeWidth(node);
        tl.to(node, {
            left:(parseFloat(node.style.left) + nodeWidth + gap) + "em" ,
        }, "<");
    });
}

export function moveNodeToLeft(tl, nodes, gap) {
    nodes.forEach(node => {
        let nodeWidth = getNodeWidth(node);
        tl.to(node, {
            left:(parseFloat(node.style.left) - nodeWidth - gap) + "em" ,
            ease: "power4.out",
            duration: 1,
        }, "<")
    })
}

export function changeNullStyle(tl, no, style, pos) {
    tl.to(no, style, pos);
}
export function getNodeWidth(node) {
    return node.getBoundingClientRect().width/parseInt(getComputedStyle(node).fontSize);
}

export function getNodeHeight(node) {
    return node.getBoundingClientRect().height/parseInt(getComputedStyle(node).fontSize);
}

