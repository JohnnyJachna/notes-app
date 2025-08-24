import nh3

ALLOWED_TAGS = {
    "p","br","strong","em","u","s",
    "blockquote","code","pre",
    "ul","ol","li",
    "h1","h2","h3","h4","h5","h6",
    "hr","span","img","a"
}

# IMPORTANT:
# Do NOT list 'class' in attributes for tags that also appear in allowed_classes.
# That double declaration triggers the nh3 internal assertion you saw.
ALLOWED_ATTRS = {
    "img": {"src","alt","title"},
    "a": {"href","title","target"},
    # removed 'code': {'class'} and 'span': {'class'}
}

ALLOWED_PROTOCOLS = {"http","https","data"}  # drop 'data' if you don't want data URIs
ALLOWED_CLASSES = {
    "code": {"language-js","language-python","hljs"},
    "span": {"hljs-keyword","hljs-string"},
}

CLEAN_CONTENT_TAGS = {"script","style"}

def sanitize_html(raw: str | None) -> str:
    if not raw:
        return ""
    return nh3.clean(
        raw,
        tags=ALLOWED_TAGS,
        attributes=ALLOWED_ATTRS,
        url_schemes=ALLOWED_PROTOCOLS,
        allowed_classes=ALLOWED_CLASSES,
        clean_content_tags=CLEAN_CONTENT_TAGS,
        strip_comments=True,
        link_rel="noopener noreferrer nofollow",
        set_tag_attribute_values={"a": {"target": "_blank"}},
    )