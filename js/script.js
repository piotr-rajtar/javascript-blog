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
    optArticleTagsSelector ='.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags';  //spróbowac potem z odwrotną kolejnością czy zadziała //.tags.list

/* ----------------------------------------------------------------------------------------*/

  function generateTitleLinks(customSelector = ''){

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

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

    /* [DONE] create a new variable allTags with an empty array */

    let allTags = {};

    /* [DONE] find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */

    for (let article of articles) {

      /* [DONE] find tags wrapper */

      const tagWrapper = article.querySelector(optArticleTagsSelector);

      /* [DONE] make html variable with empty string */

      let html = '';

      /* [DONE] get tags from data-tags attribute */

      const tags = article.getAttribute('data-tags');

      /* [DONE] split tags into array */

      const splitTags = tags.split(' ');

      /* [DONE] START LOOP: for each tag */

      for (let splitTag of splitTags) {

        /* [DONE] generate HTML of the link */

        const link = '<li><a href="#tag-' + splitTag + '">' + splitTag + '</a></li>';

        /* [DONE] add generated code to html variable */

        html = html + link;

        /* [DONE] check if this link is NOT already in allTags */

        if (!allTags[splitTag]){

          /* [DONE] add tag to allTags object */

          allTags[splitTag] = 1;

        } else {
          allTags[splitTag]++;
        }

      /* [DONE] END LOOP: for each tag */

      }

      /* [DONE] insert HTML of all the links into the tags wrapper */

      tagWrapper.innerHTML = html;

    /* [DONE] END LOOP: for every article: */

    }

    /* [DONE] find list of tags in right column */

    const tagList = document.querySelector(optTagsListSelector);

    /* [DONE] create variable for all links HTML code */

    let allTagsHTML = '';

    /* [DONE] START LOOP: for each tag in allTags: */

    for (let tag in allTags) {

      /* [DONE] generate code of a link and add it to allTagsHTML */

      allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a></li>';

    /* [DONE] END LOOP: for each tag in allTags: */

    }

    /*[DONE] add HTML from allTagsHTML to tagList */

    tagList.innerHTML = allTagsHTML;

  }

  generateTags();

/* ----------------------------------------------------------------------------------------*/

  function tagClickHandler(event){

    /* [DONE] prevent default action for this event */

    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');

    /* [DONE] find all tag links with class active */

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* [DONE] START LOOP: for each active tag link */

    for (let activeTagLink of activeTagLinks) {

      /* [DONE] remove class active */

      activeTagLink.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */

    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

    const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* [DONE] START LOOP: for each found tag link */

    for (let targetTagLink of targetTagLinks) {

      /* [DONE] add class active */

      targetTagLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */

    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

/* ----------------------------------------------------------------------------------------*/

  function addClickListenersToTags(){
    /* [DONE] find all links to tags */

    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* [DONE] START LOOP: for each link */

    for (let tagLink of tagLinks) {

      /* [DONE] add tagClickHandler as event listener for that link */

      tagLink.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */
    }
  }

  addClickListenersToTags();

/* ----------------------------------------------------------------------------------------*/

  function generateAuthors(){

    /* [DONE] find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */

    for (let article of articles) {

      /* [DONE] find author wrapper */

      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      /* [DONE] get author from data-author attribute */

      const author = article.getAttribute('data-author');

      /* [DONE] generate HTML of the link */

      const html = '<a href="#author-' + author + '">' + author + '</a>';

      /* [DONE] insert HTML of the link into the author wrapper */

      authorWrapper.innerHTML = html;

    /* [DONE] END LOOP: for every article: */

    }

  }

  generateAuthors();

/* ----------------------------------------------------------------------------------------*/

  function authorClickHandler(event){

    /* [DONE] prevent default action for this event */

    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "author" and extract author from the "href" constant */

    const author = href.replace('#author-', '');

    /* [DONE] find all author links with class active */

    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* [DONE] START LOOP: for each active author link */

    for (let activeAuthor of activeAuthors) {

      /* [DONE] remove class active */

      activeAuthor.classList.remove('active');

    /* [DONE] END LOOP: for each active author link */

    }

    /* [DONE] find all author links with "href" attribute equal to the "href" constant */

    const targetAuthors = document.querySelectorAll('a[href="' + href + '"]');

    /* [DONE] START LOOP: for each found author link */

    for (let targetAuthor of targetAuthors) {

      /* [DONE] add class active */

      targetAuthor.classList.add('active');

    /* [DONE] END LOOP: for each found author link */

    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-author=' + author + ']');

  }

/* ----------------------------------------------------------------------------------------*/

  function addClickListenersToAuthors(){

    /* [DONE] find all links to authors */

    const authorLinks = document.querySelectorAll('a[href^="#author-"]');

    /* [DONE] START LOOP: for each link */

    for (let authorLink of authorLinks) {

      /* [DONE] add authorClickHandler as event listener for that link */

      authorLink.addEventListener('click', authorClickHandler);

    /* [DONE] END LOOP: for each link */

    }

  }

  addClickListenersToAuthors();

/* ----------------------------------------------------------------------------------------*/

}
