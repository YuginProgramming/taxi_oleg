

const generateMenu = async (array, backcallback) => {
    if (!array) {
        const menu = [
            [
                { text: 'Назад 👈', callback_data: backcallback }, { text: 'Вихід 🚪', callback_data: 'exit' }
            ],
            
        ]

        return menu;

    } else {

        const menu = array.map(el => [
            { text: el, callback_data: el }
        ]);

        console.log(menu);

        return menu;
    }           

}

export default generateMenu;