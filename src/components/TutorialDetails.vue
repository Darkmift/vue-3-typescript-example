<template>
  <div v-if="currentTutorial.id" class="edit-form">
    <h4>Tutorial</h4>
    <form v-if="currentTutorial">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentTutorial?.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteTutorial">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateTutorial">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TutorialDataService from "@/services/TutorialDataService";
import Tutorial from "@/types/Tutorial";

export default defineComponent({
  name: "tutorial",
  data() {
    return {
      currentTutorial: {} as Tutorial | undefined,
      message: "",
    };
  },
  methods: {
    getTutorial(id: string) {
      TutorialDataService.get(id)
        .then((response: Tutorial | undefined) => {
          this.currentTutorial = response;
          console.log(response);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updatePublished(status: boolean) {
      if (!this.currentTutorial?.id) {
        console.log("no tutorial!");
        return;
      }

      let data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status,
      };

      TutorialDataService.update(this.currentTutorial.id || "", data)
        .then((response: Tutorial | undefined) => {
          console.log(response);
          if (!this.currentTutorial) {
            throw new Error("currentTutorial is not defined");
          }
          this.currentTutorial.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateTutorial() {
      if (!this.currentTutorial) {
        console.log("currentTutorial is undefined");
        return;
      }

      TutorialDataService.update(
        this.currentTutorial.id || "",
        this.currentTutorial
      )
        .then((response: Tutorial | undefined) => {
          console.log(response);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial?.id || "")
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "tutorials" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    if (this.$route.params.id && typeof this.$route.params.id === "string")
      this.getTutorial(this.$route.params.id);
  },
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
