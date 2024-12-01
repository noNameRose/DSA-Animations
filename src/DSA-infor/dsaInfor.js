export const infor = {
    LinkedList: {
        menu: {
            method: {
                "Remove(i)": {
                    needIndex: true,
                    needValue: false,
                },
                "Insert(i)": {
                    needIndex: true,
                    needValue: true,
                },
                "Search": {
                    needValue: true,
                    needIndex: false,
                },
            },
            color: {
                butShadowColor:"#598DA7",
                startButColor:"#477186",
                startButText:"white",
                methodButColor:"#477186",
                plainTextColor:"white",
                methodTextColor:"white",
                menuTheme:"#113c51",
                methodTabText:"white",
                methodTabbg:"#477186",
                closeTabBorder:"#27556C",
                menuShadow:"#032536",
            }
        },
    },
    Stack: {
        menu: {
            method: {
                "Push": {
                    needIndex: false,
                    needValue: true,
                },
                "Pop": {
                    needIndex: false,
                    needValue: false,
                }
            },
            color: {
                butShadowColor:"#9d6b53",
                startButColor:"#e6b8a2",
                startButText:"#774936",
                methodButColor:"#e6b8a2",
                plainTextColor:"#edc4b3",
                methodTextColor:"#774936",
                menuTheme:"#b07d62",
                methodTabText:"#774936",
                methodTabbg:"#edc4b3",
                closeTabBorder:"#c38e70",
                menuShadow:"#774936",
            },

        }
    },
    BinarySearchTree: {
        menu: {
        method: {
            "InOrder": {
                needIndex: false,
                needValue: false,
            },
            "PostOrder": {
                needIndex: false,
                needValue: false,
            },
            "PreOrder": {
                needIndex: false,
                needValue: false,
            },
            "Insert": {
                needValue: true,
                needIndex: false,
            },
            "Search": {
                needValue: true,
                needIndex: false,
            },
        },

        color: {
            butShadowColor:"#e5f1e3",
            startButColor:"#a3cd9e",
            startButText:"white",
            methodButColor:"#a3cd9e",
            plainTextColor:"white",
            methodTextColor:"white",
            menuTheme:"#529471",
            methodTabText:"white",
            methodTabbg:"#a3cd9e",
            closeTabBorder:"#e5f1e3",
            menuShadow:"#35635b",
        }
    }
    }
}