'use strict'

document.addEventListener('DOMContentLoaded', _initializeFilesViewers)

function _initializeFilesViewers () {
    Array.from(document.getElementsByClassName('files'))
        .forEach(_initializeFilesViewer)
}

function _initializeFilesViewer (filesElement) {
    const filesViewerElement = filesElement.getElementsByClassName('files-viewer')
        .item(0)

    Array.from(filesViewerElement.getElementsByClassName('files-viewer-close'))
        .forEach(filesViewerCloseElement => {
            filesViewerCloseElement.addEventListener(
                'click',
                event => {
                    hideFilesViewer(filesViewerElement)
                    event.stopPropagation()
                },
            )
        })

    Array.from(filesElement.querySelectorAll('a[data-bs-slide-to]'))
        .forEach(linkElement => {
            linkElement.addEventListener(
                'click',
                event => {
                    showFilesViewer(filesViewerElement)
                    event.stopPropagation()
                },
            )
        })
}

function showFilesViewer(filesViewerElement) {
    document.body.style.setProperty('overflow', 'hidden')
    filesViewerElement.style.setProperty('display', 'block')
}

function hideFilesViewer(filesViewerElement) {
    document.body.style.removeProperty('overflow')
    filesViewerElement.style.setProperty('display', 'none')
}
