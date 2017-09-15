<template>
  <v-flex xs6 offset-xs3>
    <v-card>
      <v-card-title primary-title>
        <h3>Search</h3>
      </v-card-title>
      <v-card-text>
        <form @submit.prevent="onSearch">
          <v-layout column>
            <v-flex xs8 offset-xs2>
              <v-text-field
                name="centre number"
                v-model="search.centre"
                label="Centre Number"
                :error-messages="centreErrors"
                @input="$v.search.centre.$touch()"
                @blur="$v.search.centre.$touch()"
              ></v-text-field>
              <v-select
                v-bind:items="exams"
                v-model="search.exam"
                :error-messages="examErrors"
                @change="$v.search.exam.$touch()"
                @blur="$v.search.exam.$touch()"
                item-text="name"
                item-value="name"
                label="Exam"
                bottom
              ></v-select>
              <div v-for="exam in exams" :key="exam.id">
                <div v-if="search.exam === exam.name">
                  <div v-for="component in exam.components" :key="component.name">
                    <v-checkbox primary class="pa-0" :label="component.name" :value="component.name" v-model="search.components"></v-checkbox>
                  </div>
                </div>
              </div>
            </v-flex>
            <v-flex xs1 offset-xs9>
              <v-btn
                large
                class="primary mt-5"
                :disabled="$v.search.$invalid"
                type="submit"
              >Search</v-btn>
            </v-flex>
          </v-layout>
        </form>
        <pre>{{search}}</pre>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      search: {centre: '', exam: '', components:[]},
    }
  },
  computed: {
    exams () {
      return this.$store.getters.loadedExams
    },
    centreErrors () {
      const errors = []
      if (!this.$v.search.centre.$dirty) return errors
      !this.$v.search.centre.minLength && errors.push('Centre number must be 5 characters long')
      !this.$v.search.centre.maxLength && errors.push('Centre number must be 5 characters long')
      !this.$v.search.centre.required && errors.push('Centre number is required.')
      return errors
    },
    examErrors () {
      const errors = []
      if (!this.$v.search.exam.$dirty) return errors
      !this.$v.search.exam.required && errors.push('Centre number is required.')
      return errors
    },
  },
  validations: {
    search: {
      required,
      centre: {required, minLength: minLength(5), maxLength: maxLength(5)},
      exam: {required},
      components: {
        required,
        minLength: minLength(1),
      }
    }
  },
  methods: {
    onSearch: function () {
      const searchData = this.search
      this.$store.dispatch('loadContHistory', searchData)
    },
  }
}
</script>

<style>

</style>
