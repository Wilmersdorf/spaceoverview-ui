<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">Home</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Home</h1>
    <div class="mt-4">
      SpaceOverview.com is an open source project that makes it easier for students and researchers
      to find mathematical knowledge.
    </div>
    <div class="mt-2 mb-2">
      We currently list
      <a href="https://en.wikipedia.org/wiki/Banach_space" target="_blank">Banach spaces</a
      >&nbsp;and
      <a href="https://en.wikipedia.org/wiki/Differential_equation" target="_blank"
        >differential equations</a
      >.
    </div>
    You can
    <ul>
      <li>
        See a list of
        <router-link :to="`/space`">Banach spaces</router-link>
      </li>
      <li>
        See a list of
        <router-link :to="`/property`">properties</router-link>&nbsp;of Banach spaces
      </li>
      <li>
        See a list of
        <router-link :to="`/theorem`">theorems</router-link>&nbsp;of Banach spaces
      </li>
      <p></p>
      <li>
        See a list of
        <router-link :to="`/differential-equation`">differential equations</router-link>
      </li>
      <li>
        See a list of
        <router-link :to="`/differential-equation/property`">properties</router-link>&nbsp;of
        differential equations
      </li>
      <p></p>
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
          >Notion</a
        >
      </li>
    </ul>
    <div>
      This website is currrently in alpha status. Please write an email to info@spaceoverview.com if
      you're interested in contributing to this project, for example by
      <ul>
        <li>Giving feedback</li>
        <li>Testing future versions</li>
        <li>Adding Banach spaces, differential equations, properties or theorems.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>
