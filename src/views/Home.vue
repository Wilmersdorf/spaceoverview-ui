<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">Home</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Home</h1>
    <div
      class="mt-4"
    >SpaceOverview.com is an open source project that makes it easier for students and researchers to find mathematical knowledge.</div>
    <div class="mt-2 mb-2">
      We currently list
      <a
        href="https://en.wikipedia.org/wiki/Banach_space"
        target="_blank"
      >Banach spaces</a> and their properties to answer the following questions:
    </div>
    <ul>
      <li>Given a Banach space, which properties does this space have or lack?</li>
      <li>Given a property, which Banach spaces have or lack this property?</li>
    </ul>You can
    <ul>
      <li>
        See a list of all
        <router-link :to="`/space`">spaces</router-link>
      </li>
      <li>
        See a list of all
        <router-link :to="`/property`">properties</router-link>
      </li>
      <li>
        See a list of all
        <router-link :to="`/theorem`">theorems</router-link>
      </li>
      <li>
        <span>Browse the source code on GitHub (</span>
        <a href="https://github.com/Wilmersdorf/spaceoverview" target="_blank">Server</a>,
        <a href="https://github.com/Wilmersdorf/spaceoverview-ui" target="_blank">Front end</a>
        <span>)</span>
      </li>
      <li>
        Find a list of future product ideas on
        <a
          href="https://www.notion.so/Product-Plan-ad0dae2671974850a42cd0db3145e212"
          target="_blank"
        >Notion</a>
      </li>
    </ul>
    <div>
      This website is currrently in alpha status. Please write an email to info@spaceoverview.com if you're interested in contributing to this project, for example by
      <ul>
        <li>Giving feedback</li>
        <li>Testing future versions</li>
        <li>Adding spaces, properties and theorems</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>
