<template>
  <v-container>
    <v-layout row wrap align-center class="mt-5">
      <v-flex xs12>
        <h4 class="text-xs-center primary--text">Create a new exam</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form class="mt-5">
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="name"
                v-model="newExam.name"
                label="Exam Name"
                id="examName"
                required></v-text-field>
              <div class="mt-3" v-for="(component, index) in newExam.components" :key="component.name">
                <v-layout row justify-space-between>
                  <h5 style="margin: 8px 0px;">Component #{{index + 1}}</h5>
                  <v-btn v-if="newExam.components.length > 1" @click="removeComponent(component)" icon class="red--text">
                    <v-icon dark>clear</v-icon>
                  </v-btn>
                </v-layout>
                <v-select
                  v-bind:items="componentsArray"
                  v-model="component.name"
                  item-text="name"
                  label="Component" 
                  single-line
                  bottom
                  required></v-select>
                  <div v-for="(version, index) in component.versions" :key="version.name">
                    <v-layout row justify-space-between>
                      <h6 style="margin: 14px 0px;">Version #{{index + 1}}</h6>
                      <v-btn v-if="component.versions.length > 1" @click="removeVersion(component, version)" icon class="red--text">
                        <v-icon dark>clear</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-text-field
                      v-model="version.name"
                      name="name"
                      label="Version Name"
                      id="versionName"
                      required></v-text-field>
                    <v-switch
                      v-bind:label="addLabel(version.active)" 
                      v-model="version.active"></v-switch>
                  </div>
                  <v-btn small @click="addVersion(component)">Add Version</v-btn>
              </div>
              <v-btn small dark class="mt-5 pink" @click="addComponent()">Add Component</v-btn>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary mt-5"
                :disabled=false
                type="submit">Create Exam</v-btn>
            </v-flex>
          </v-layout>
        </form>
        <pre>{{ newExam }}</pre>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      newExam: {name: '', components: [{name: '', versions: [{name: '', active: false}]}]},
      componentsArray: [
        { name: 'Reading', value:'Reading'},
        { name: 'Reading and Use of English', value:'Reading and Use of English'},
        { name: 'Reading and Writing', value: 'Reading and Writing'},
        { name: 'Writing', value: 'Writing'},
        { name: 'Listening', value: 'Listening'},
        { name: 'Speaking', value: 'Speaking'}
      ],
    }
  },
  validations: {
    newExam: {
      name: {required, minLength: minLength(3)},
      components: {
        $each: {
          name: {required},
          versions: {
            $each: {
              name: {required}
            }
          }
        }
      }
    }
  },
  methods: {
    addComponent: function () {
      this.newExam.components.push({name: '', versions:[]});
    },
    removeComponent: function (component) {
      var index = this.newExam.components.indexOf(component)
      this.newExam.components.splice(index, 1)
    },
    addVersion: function (component) {
      component.versions.push({name: '', active: false});
    },
    removeVersion: function (component, version) {
      var index = component.versions.indexOf(version)
      component.versions.splice(index, 1)
    },
    addLabel: function (versionState) {
      var label = ''
      if (versionState) {
        label = 'Active'
      } else {
        label = 'Inactive'
      }
      return label
    }
  }
}
</script>

<style>

</style>