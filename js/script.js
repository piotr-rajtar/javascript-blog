'use strict';
{

/* ----------------------------------------------------------------------------------------*/
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const linkAttribute = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(linkAttribute);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
  }

/* ----------------------------------------------------------------------------------------*/

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector ='.post-tags .list';

/* ----------------------------------------------------------------------------------------*/

  function generateTitleLinks(){

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for(let article of articles) {

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */ /* get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [DONE] insert link into titleList */

      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();

/* ----------------------------------------------------------------------------------------*/

  function generateTags(){
    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find tags wrapper */

      const tagWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const tags = article.getAttribute('data-tags');

      /* split tags into array */

      const splitTags = tags.split(' ');

      /* START LOOP: for each tag */

      for (let splitTag of splitTags) {

        /* generate HTML of the link */

        const link = '<li><a href="#tag-' + splitTag + '">' + splitTag + '</a></li>';

        /* add generated code to html variable */

        html = html + link;

      /* END LOOP: for each tag */

      }

      /* insert HTML of all the links into the tags wrapper */

      tagWrapper.innerHTML = html;

    /* END LOOP: for every article: */

    }

  }

  generateTags();

}

/* ----------------------------------------------------------------------------------------*/
