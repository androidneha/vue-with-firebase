<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
        <form @submit.prevent="AddSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div class="field" v-for="(ing, index) in ingredients" :key="index">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback">{{ feedback }}</p>
                <button class="btn pink">Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
    import db from '@/firebase/init'
    import slugify from 'slugify'
    export default {
        name: 'AddSmoothie',
        data(){
            return{
                title: null,
                another: null,
                ingredients: [],
                feedback: null,
                slug: null
            }
        },
        methods: {
            AddSmoothie(){
                if(this.title){
                    this.feedback = null;
                    //create slug
                    this.slug = slugify(this.title, {
                        replacement : '-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower: true
                    });
                    db.collection('smoothies').add({
                        title: this.title,
                        ingredients: this.ingredients,
                        slug : this.slug
                    }).then(() => {
                        this.$router.push({ name: 'Index'})
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.feedback = 'You must enter a smoothie title'
                }
            },
            addIng(){
                if(this.another){
                    this.ingredients.push(this.another);
                    this.another = null;
                    this.feedback = null
                } else {
                    this.feedback = 'You must enter a value to add an ingredient'
                }
            },
            deleteIng(ing) {
                this.ingredients = this.ingredients.filter(ingredient => ingredient !== ing)
            }
        }
    }
</script>

<style scoped>
.add-smoothie {
    padding: 50px;
}
</style>