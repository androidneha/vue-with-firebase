<template>
    <div class="index container">
        <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
            <div class="card-content">
                <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
                <h2 class="indigo-text">{{ smoothie.title }}</h2>
                <ul class="ingredients">
                    <li v-for="(ing, index) in smoothie.ingredients" :key="index"> 
                        <span class="chip">{{ ing }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import db from '@/firebase/init'
    export default {
        name: 'Index',
        data () {
            return {
                smoothies: []
            }
        },
        methods: {
            deleteSmoothie(id) {
                this.smoothies = this.smoothies.filter(smoothie => {
                    return smoothie.id != id
                })
            },
            createdSmoothie() {
                db.collection('smoothie').get().then(snapshot => {
                    snapshot.foreach(doc => {
                        let smth = doc.data()
                        smth.id = doc.id
                        this.smoothies.push(smth)
                    })
                })
            }
        }
    }
    createdSmoothie();
</script>

<style scoped>

.index{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
}

.index h2 {
    font-size: 1.8em;
    margin-top: 0;
}

.index .ingredients {
    margin: 30px auto;
}

.index .ingredients li {
    display: inline-block;
}

.index .delete { 
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    color: #303f9f;
}
</style>
