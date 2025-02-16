document.addEventListener("DOMContentLoaded", async () => {
    const needToTranslateDocuments = Array.from(document.querySelectorAll(`[data-i18n]`))

    const needed_translations = needToTranslateDocuments.map(el => el.dataset.i18n)

    console.log(needed_translations);

    /** @returns {Promise<{[key: string]: string}>} */
    async function getTranslations() {
        return await fetch(
            `/execute$python ./scripts/translations.sh.py '${JSON.stringify(needed_translations, null, 0)}'`,
            { method: "GET" }
        )
            .then(res => {
                console.log(res.clone().text());
                return res.json()
            })
            .then(data => {
                console.log(data)
                return data
            })
    }

    await getTranslations().then((translations => {
        needToTranslateDocuments.forEach(el => {
            const data_translation_id = el.dataset.i18n

            el.textContent = translations[data_translation_id] ?? data_translation_id
        })
    }))
})